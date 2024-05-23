import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import prisma from "./../prismaClient/index.js";

export const signupController = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    // Check username duplicate
    const user = await prisma.user.findFirst({
      where: { username },
    });
    // const user = await User.findOne({ userName: username });
    if (user)
      return res.status(400).json({
        error: `Username ${username} is taken`,
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    if (newUser) {
      // Generate JWT token
      generateTokenAndSetCookie(newUser._id, res);

      // User created successfully
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({ where: { username } });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user.id, res);

    return res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
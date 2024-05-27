import prisma from "../prismaClient/index.js";

export const searchUsersController = async (req, res) => {
  try {
    const { query } = req.params;
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
      select: {
        _count: true,
        username: true,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

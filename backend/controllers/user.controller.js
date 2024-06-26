import prisma from "../prismaClient/index.js";

// SEARCH USER BY USERNAME
export const searchUsersController = async (req, res) => {
  try {
    let { query } = req.query;
    query.toLowerCase();
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
      select: {
        id: true,
        username: true,
        profilePicture: true,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// UPDATE PROFILE PICTURE
export const updateProfilePicture = async (req, res) => {
  try {
    const { id: userId } = req.user;
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePicture: `uploads/${req.file.filename}`,
      },
    });
    return res
      .status(200)
      .json({ message: "Profile picture successsfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// GET USER BY ID
export const getUserByIdController = async (req, res) => {
  const userId = Number(req.params.userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      profilePicture: true,
      watchlist: {
        select: {
          movieItems: {
            select: {
              movie: true,
              status: true,
            },
          },
        },
      },
      followers: {
        select: {
          followingUser: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
            },
          },
        },
      },
      following: {
        select: {
          followerUser: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
            },
          },
        },
      },
      _count: {
        select: {
          following: true,
          followers: true,
        },
      },
    },
  });

  const isFollowing = (await prisma.follow.findFirst({
    where: {
      followerId: req.user.id,
      followingId: userId,
    },
  }))
    ? true
    : false;

  if (!user) return res.status(404).json({ error: "User does not exist" });
  return res.status(200).json({ ...user, isFollowing });
};

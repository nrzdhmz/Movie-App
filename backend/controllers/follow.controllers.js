import prisma from "../prismaClient";

// Get following list of the user
export const getFollowingController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const followingList = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        followingUser: {
          select: {
            _count: true,
            username: true,
          },
        },
      },
    });
    return res.status(200).json({ followingList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get followers list of the user
export const getFollowerController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const followerList = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follwerUser: {
          select: {
            _count: true,
            username: true,
          },
        },
      },
    });
    return res.status(200).json({ followerList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

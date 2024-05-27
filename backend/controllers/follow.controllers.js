import prisma from "../prismaClient/index.js";

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

// User follows another user
export const addFollowingController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { followingId } = req.body;
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId,
      },
    });
    return res.status(200).json({ message: "Successfully followed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// User unfollows another user
export const removeFollowingController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { followingId } = req.body;

    await prisma.follow.delete({
      where: {
        followerId: userId,
        followingId,
      },
    });
    return res.status(200).json({ message: "Successfully unfollowed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

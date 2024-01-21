export const checkUserAccess = async ({ prisma, userInfo, postId }: any) => {
  const user = await prisma.user.findUnique({
    where: { id: userInfo },
  });

  if (!user) {
    return {
      userError: "user not found",
      post: null,
    };
  }
  const existPost = await prisma.post.findUnique({
    where: { id: postId },
  });
  // console.log("data:", existPost);
  if (!existPost) {
    return {
      userError: "Post not found",
      post: null,
    };
  }

  if (existPost.authorId !== user.id) {
    return {
      userError: "Post not owned by user",
      post: null,
    };
  }
  return {
    user,
    existPost,
  };
};

export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log("data:", args);
    console.log("userInfo:", userInfo);
    if (!userInfo) {
      return {
        userError: "unauthorized",
        post: null,
      };
    }
    if (!args.title || !args.content) {
      return {
        userError: "title and content is required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo,
      },
    });
    return {
      userError: null,
      post: result,
    };
  },
};

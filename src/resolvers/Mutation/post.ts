import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    // console.log("data:", post);
    // console.log("userInfo:", userInfo);
    if (!userInfo) {
      return {
        userError: "unauthorized",
        post: null,
      };
    }
    if (!post.title || !post.content) {
      return {
        userError: "title and content is required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo,
      },
    });
    return {
      userError: null,
      post: result,
    };
  },
  updatePost: async (
    parent: any,
    { postId, post }: any,
    { prisma, userInfo }: any
  ) => {
    // console.log("data:", post, "postId:", postId, "userInfo:", userInfo);
    if (!userInfo) {
      return {
        userError: "unauthorized",
        post: null,
      };
    }
    const checkUser = await checkUserAccess({ prisma, userInfo, postId });

    if (checkUser.userError) {
      return {
        userError: checkUser.userError,
      };
    }

    if (checkUser.existPost.authorId !== checkUser.user.id) {
      return {
        userError: "Post not owned by user",
        post: null,
      };
    }

    if (checkUser.existPost.authorId !== checkUser.user.id) {
      return {
        userError: "Post not owned by user",
        post: null,
      };
    }

    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: post,
    });
    // console.log("result:", result);
    return {
      userError: null,
      post: result,
    };
  },
  deletePost: async (
    parent: any,
    { postId }: any,
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        userError: "unauthorized",
      };
    }
    const checkUser = await checkUserAccess({ prisma, userInfo, postId });

    if (checkUser.userError) {
      return {
        userError: checkUser.userError,
      };
    }

    if (checkUser.existPost.authorId !== checkUser.user.id) {
      return {
        userError: "Post not owned by user",
        post: null,
      };
    }
    //    console.log("Tareq");
    const result = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return {
      userError: checkUser.userError,
      post: result,
    };
    // console.log("result:", result);
  },
  publishedPost: async (
    parent: any,
    { postId, post }: any,
    { prisma, userInfo }: any
  ) => {
    // console.log("data:", post, "postId:", postId, "userInfo:", userInfo);
    if (!userInfo) {
      return {
        userError: "unauthorized",
        post: null,
      };
    }
    const checkUser = await checkUserAccess({ prisma, userInfo, postId });

    if (checkUser.userError) {
      return {
        userError: checkUser.userError,
      };
    }

    if (checkUser.existPost.authorId !== checkUser.user.id) {
      return {
        userError: "Post not owned by user",
        post: null,
      };
    }

    if (checkUser.existPost.authorId !== checkUser.user.id) {
      return {
        userError: "Post not owned by user",
        post: null,
      };
    }

    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        publish: true,
      },
    });
    // console.log("result:", result);
    return {
      userError: null,
      post: result,
    };
  },
};

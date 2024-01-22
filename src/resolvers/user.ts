// type User{
//   id:ID!
//   name:String!
//   email:String!
//   # password:String!
//   createdAt:String!
//   posts:[Post]
// }

export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("User parent:", parent);
    const me = parent.id === userInfo;
    // console.log("me:", me);
    if (me) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          publish: true,
        },
      });
    }
  },
};

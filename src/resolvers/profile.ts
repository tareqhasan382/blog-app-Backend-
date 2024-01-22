// type Profile{
//   id:ID!
//   bio:String!
//   createdAt:String!
//   user:User!
// }

export const Profile = {
  user: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("User parent:", parent);

    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};

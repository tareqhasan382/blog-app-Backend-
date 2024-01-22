// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("userInfo:", userInfo);
    const data = await prisma.user.findUnique({
      where: {
        id: userInfo,
      },
    });
    //console.log(data);
    return data;
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    //  console.log("args userId:", args.userId);
    const result = await prisma.profile.findUnique({
      where: {
        id: args.userId,
      },
    });
    return result;
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    const data = await prisma.user.findMany();
    //console.log(data);
    return data;
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    const data = await prisma.post.findMany({
      where: {
        publish: false,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    //console.log(data);
    return data;
  },
  // post: async (parent: any, args: any, { prisma }: any) => {
  //   const data = await prisma.post.findUnique({ where: { id: args.id } });
  //   //console.log(data);
  //   return data;
  // },
};
export default Query;

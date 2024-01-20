// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    const data = await prisma.user.findMany();
    //console.log(data);
    return data;
  },
};
export default Query;

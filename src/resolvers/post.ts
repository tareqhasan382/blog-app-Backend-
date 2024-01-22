// type Post {
//   id:ID!
//   title:String!
//   content:String!
//   author:User
//   createdAt:String!
//   publish:Boolean!
// }
// type User{
//   id:ID!
//   name:String!
//   email:String!
//   # password:String!
//   createdAt:String!
//   posts:[Post]

import { userLoader } from "../dataLoader/userLoader";

// }
export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log("parent:", parent);
    // const result = await prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });
    // return result;
    return userLoader.load(parent.authorId);
  },
};

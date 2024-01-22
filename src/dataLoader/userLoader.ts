// npm i dataloader

import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

// Batching and caching
const batchUsers = async (ids: string[]): Promise<User[]> => {
  // ids : [1,2,3,4,5,6,] unique
  console.log("ids:", ids);
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  console.log("users:", users);
  /* create group
 {
  1:(id:1,name:Tareq)
  2:(id:2,name:Hasan)
  3:(id:3,name:Sabbir) 
 }
  */
  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });
  console.log("userData:", userData);
  return ids.map((id) => userData[id]);
};
// now data caching
//@ts-ignore
export const userLoader = new DataLoader<string, User>(batchUsers);

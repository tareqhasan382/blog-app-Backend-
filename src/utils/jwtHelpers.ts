import jwt from "jsonwebtoken";
import config from "../config";

export const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string) as {
      userId: string;
    };
    // console.log(" userData:", userData);
    return userData.userId;
  } catch (error) {
    return null;
  }
};

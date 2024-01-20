import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
interface signupUser {
  name: string;
  email: string;
  password: string;
  bio: string;
}
interface loginUser {
  email: string;
  password: string;
}
export const authResolvers = {
  signup: async (parent: any, args: signupUser, { prisma }: any) => {
    console.log("data:", args);
    const existUser = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (existUser) {
      return { userError: "already this email registered!" };
    }
    const hashPassword = await bcrypt.hash(args.password, 13);
    const result = await prisma.user.create({
      data: { name: args.name, email: args.email, password: hashPassword },
    });
    if (args.bio) {
      // userId bio
      await prisma.profile.create({
        data: { bio: args.bio, userId: result.id },
      });
    }
    return { user: result };
  },
  login: async (parent: any, args: loginUser, { prisma }: any) => {
    const existUser = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!existUser) {
      return { userError: "user not found!" };
    }
    const verifyPassword = await bcrypt.compare(
      args.password,
      existUser.password
    );
    if (!verifyPassword) {
      return { userError: "incorrect Password !" };
    }
    const accessToken = jwt.sign(
      {
        userId: existUser.id,
        name: existUser.name,
        email: existUser.email,
      },
      // process.env.JWT_SIGN as Secret,
      config.jwt.secret as Secret,
      { expiresIn: "1d" }
    );
    return { token: accessToken, userError: null };
  },
};

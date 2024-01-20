import { authResolvers } from "./auth";
import { postResolvers } from "./post";

const Mutation = {
  ...authResolvers,
  //=========== Post Mutation===============
  ...postResolvers,
};

export default Mutation;

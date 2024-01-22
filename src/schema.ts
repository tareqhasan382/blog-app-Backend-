//  what we see depends write schema
export const typeDefs = `#graphql
type Query{
  me:User
  users:[User]
  posts:[Post]
  profile(userId:ID!):Profile # public route api
  # profile:Profile 
}
type Mutation {
  signup(name:String!,email:String!,password:String!,bio:String):UserSignup,

  login(email:String!,password:String!):AuthPayload,

  addPost(post:PostInput!):PostPayload,
  updatePost(postId:ID!,post:PostInput!):PostPayload,
  deletePost(postId:ID!):PostPayload,
  publishedPost(postId:ID!):PostPayload

}

  type Post {
    id:ID!
    title:String!
    content:String!
    author:User
    createdAt:String! 
    publish:Boolean!
  }
  type User{
    id:ID!
    name:String!
    email:String!
    # password:String!
    createdAt:String!
    posts:[Post]
  }
 
  type Profile{
    id:ID!
    bio:String!
    createdAt:String!
    user:User!
  }
  # =========paload Type===============
  
          type UserSignup{
            userError:String
            user:User
            }
          type AuthPayload{
            userError:String
            token:String
            }
          type PostPayload {
            userError:String
            post:Post
          }
          input PostInput {
            title:String
            content:String
          }

`;

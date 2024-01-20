//  what we see depends write schema
export const typeDefs = `#graphql
type Query{
  me:User
  users:[User]
  posts:[Post]
}
type Mutation {
  signup(name:String!,email:String!,password:String!,bio:String):UserSignup,

  login(email:String!,password:String!):AuthPayload,

  addPost(title:String!,content:String!):PostPayload
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

`;

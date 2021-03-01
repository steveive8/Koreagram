import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        email: String!
        username: String!
        bio: String
        avatar: String
        following: [User]
        followings: [User]
        totalFollowers: Int!
        totalFollowing: Int!
        isFollowing: Boolean!
        isMe: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;
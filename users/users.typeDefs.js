import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        email: String!
        username: String!
        createdAt: String!
        updatedAt: String!
    }
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            email: String!
            username: String!
            password: String!
        ): User
        login(username: String!, password: String!): LoginResult!
    }
    type Query {
        seeProfile(username: String!): User
    }
`;
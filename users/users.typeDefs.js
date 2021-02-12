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
`;
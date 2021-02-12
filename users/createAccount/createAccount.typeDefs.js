import { gql } from "apollo-server";

export default gql`
    type CreateAccountResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            email: String!
            username: String!
            password: String!
        ): CreateAccountResult!
    }
`
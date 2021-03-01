const { gql } = require("apollo-server")

export default gql`
    type FollowUserResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        followUser(username: String): FollowUserResult!
    }
`;
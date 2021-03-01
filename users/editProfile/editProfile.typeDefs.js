import { gql } from "apollo-server";

export default gql`
    type EditProfileResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editProfile(
            firstName: String
            lastName: String
            email: String
            username: String
            bio: String
            avatar: Upload
            password: String
        ): EditProfileResult!
    }
`;
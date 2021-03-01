import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
    Mutation: {
        unFollowUser: protectedResolver(async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({
                where: {
                    username
                },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Can't unfollow the user",
                }
            };
            await client.user.update ({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                        }
                    }
                }
            });
            return {
                ok: true,
            }
        })
    }
}
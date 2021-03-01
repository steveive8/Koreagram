import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
    Mutation: {
        followUser: protectedResolver(async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({where: {username}});
            if (!ok) {
                return {
                    ok: false,
                    error: "There is no user",
                }
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id
                },
                data: {
                    following: {
                        connect: {
                            username
                        }
                    }
                }
            })
            return {
                ok: true,
            }
        })
    }
}
export default {
    Query: {
        seeFollowers: async (_, {username, page}) => {
            const ok = await client.user.findUnique({
                where: {
                    username,
                },
                select: {
                    id: true,
                }
            });
            if(!ok) {
                return {
                    ok: false,
                    error: "There are no user."
                }
            }
            const followers = await client.user.findUnique({ where: {username}}).followers({
                take: 5,
                skip: (page - 1) * 5,
            });
            const totalFollowers = await client.user.count({
                where: {
                    following: {
                        username
                    }
                }
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5)
            }
        }
    }
}
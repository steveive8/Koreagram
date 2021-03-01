export default {
    Query: {
        searchUsers: async (_, {keyword}) => await client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    }
                }
            })
        }
    }
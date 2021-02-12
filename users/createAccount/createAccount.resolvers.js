import client from '../../client';
import bcrypt from 'bcrypt';

export default {
    Mutation: {
        createAccount: async (_, {firstName, lastName, email, username, password}) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username,
                            },
                            {
                                email,
                            }
                        ]
                    }
                });
                if(existingUser){
                    throw new Error("this email or username is already taken.")
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const user = await client.user.create({data: {
                    firstName, lastName, username, email, password: uglyPassword
                }});
                if(user.id){
                    return {
                        ok: true,
                    }
                } else {
                    return {
                        ok: false,
                        error: "cannot create account."
                    }
                }
            } catch(e) {
                return e
            }
        },
    }
}
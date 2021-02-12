import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../client';

export default{
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
                return client.user.create({data: {
                    firstName, lastName, username, email, password: uglyPassword
                }});
            } catch(e) {
                return e
            }
        },
        login: async (_, {username, password}) => {
            const user = await client.user.findUnique({where: {username}})
            if(!user){
                return {
                    ok: false,
                    error: "username not found."
                }
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk) {
                return {
                    ok: false,
                    error: 'Wrong Password.'
                }
            }
            const token = await jwt.sign({id: user.id}, process.env.PRIVATE_KEY);
            return {
                ok: true,
                token,
            }
        },
    }
}
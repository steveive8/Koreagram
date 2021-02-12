import client from '../../client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
    Mutation: {
        editProfile: async (_, {firstName, lastName, email, username, password: newPassword}, {token}) => {
            const {id} = jwt.verify(token, process.env.PRIVATE_KEY);
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: {
                    id,
                },
                data: {
                    firstName,
                    lastName,
                    email,
                    username,
                    ...(uglyPassword && {password: uglyPassword})
                }
            });
            if (updatedUser.id) {
                return {
                    ok: true,
                }
            } else {
                return {
                    ok: false,
                    error: "Could not update the Profile."
                }
            }
        }
    }
}
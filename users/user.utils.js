import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
    try {
        if (!token){
            return null;
        };
        const {id} = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await client.user.findUnique({where: {id}});
        if(user) {
            return user
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export function protectedResolver (ourResolver) {
    return function (root, args, context, info) {
        if(!context.loggedInUser) {
            return {
                ok: false,
                error: 'login please'
            }
        } else {
            return ourResolver(root, args, context, info);
        }
    }
}
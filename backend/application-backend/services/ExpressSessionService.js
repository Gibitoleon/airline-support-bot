import session from 'express-session';
import { RedisStore } from 'connect-redis';
import 'dotenv/config';

export default class SessionService {

    static createSessionMiddleware(redisClient) {
        const store = new RedisStore({
            client: redisClient,
            prefix: 'sess:'
        });

        return session({
            store,

            secret: process.env.SESSION_SECRET,

            resave: false,

            saveUninitialized: false,

            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24
            }
        });
    }

    static createAuthenticatedSession(req, user) {
        req.session.userId = user.id;
        req.session.roleId = user.role_id;
    }
    static createAnonymousSession(req) {
        req.session.userId = null;
    }
   
    static destroySession(req) {
        return new Promise((resolve, reject) => {
            req.session.destroy((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }
}

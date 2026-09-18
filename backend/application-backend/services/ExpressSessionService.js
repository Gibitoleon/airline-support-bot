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
    static hasNoSessionData(req) {
        return (
            req.session.userId === undefined &&
            req.session.role === undefined &&
            req.session.group === undefined &&
            req.session.permissions === undefined
        );
    }
    static createAuthenticatedSession(req, user, authorization) {
        req.session.userId = user.id;
        req.session.role = authorization.role.name;
        req.session.group = authorization.group?.name ?? null;
        req.session.permissions = authorization.permissions;
     }
    static createAnonymousSession(req) {
        req.session.userId = null;
        req.session.role = "CUSTOMER";
        req.session.group = null
        req.session.permissions = ["VIEW_CUSTOMER_DOCUMENTS"]
        
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

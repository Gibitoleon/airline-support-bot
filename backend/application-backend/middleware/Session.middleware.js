import SessionService from "../services/ExpressSessionService.js";
export const getSessionData = (req, res, next) => {
    if (req.session.userId === undefined) {
        SessionService.createAnonymousSession(req);
    }

    req.user = {
        userId: req.session.userId
    };

    next();
};
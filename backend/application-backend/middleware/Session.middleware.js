import SessionService from "../services/ExpressSessionService.js";

export const getSessionData = (req, res, next) => {

    if (SessionService.hasNoSessionData(req)) {
        SessionService.createAnonymousSession(req);
    }

    req.user = {
        userId: req.session.userId,
        userRole: req.session.role,
        userGroup: req.session.group,
        userPermissions: req.session.permissions,
        conversationContext:req.session.conversationContext
    };

    next();
};
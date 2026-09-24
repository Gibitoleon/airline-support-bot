// middleware.js

import SessionService from "../services/ExpressSessionService.js";



 const getSessionData = (req, res, next) => {
    SessionService.setUserFromSession(req);
    next();
};

 const getCustomerSession = (req, res, next) => {

    if (SessionService.hasNoSessionData(req)) {
        SessionService.createAnonymousSession(req);
    }

    setUserFromSession(req);

    next();
};

export { getCustomerSession, getSessionData}
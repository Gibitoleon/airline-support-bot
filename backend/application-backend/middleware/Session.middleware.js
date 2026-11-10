// middleware.js

import SessionService from "../services/ExpressSessionService.js";

const getSessionData = (req, res, next) => {
  console.log("SESSION DEBUG:", {
    sessionID: req.sessionID,
    session: req.session,
    cookie: req.headers.cookie,
  });

  SessionService.setUserFromSession(req);
  console.log("USER AFTER SESSION:", req.user);

  next();
};

const getCustomerSession = (req, res, next) => {
  if (SessionService.hasNoSessionData(req)) {
    SessionService.createAnonymousSession(req);
  }

  SessionService.setUserFromSession(req);

  next();
};

export { getCustomerSession, getSessionData };

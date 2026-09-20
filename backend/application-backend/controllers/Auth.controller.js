 
 import AuthenticationService from '../services/AuthenticationService.js';
 import AuthorizationService from '../services/AuthorizationService.js';
 import SessionService from '../services/ExpressSessionService.js';
 import { StatusCodes } from 'http-status-codes';

 const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthenticationService.authenticateUser(email, password);
    const authorization = await AuthorizationService.getUserAuthorization(user.id)
    SessionService.createAuthenticatedSession(req,user,authorization);

    res.status(StatusCodes.OK).json({
    message: 'Login successful'
});
 }

 const logout = async (req, res) => {
    await SessionService.destroySession(req);
    res.status(StatusCodes.OK).json({
    message: 'Logout successful'
});
 }

 export { login, logout }
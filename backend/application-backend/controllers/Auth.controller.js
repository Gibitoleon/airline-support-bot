 
 import AuthenticationService from '../services/AuthenticationService.js';
 import AuthorizationService from '../services/AuthorizationService.js';
 import SessionService from '../services/ExpressSessionService.js';

 const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthenticationService.authenticateUser(email, password);
    const authorization = await AuthorizationService.getUserAuthorization(user.id)
    SessionService.createAuthenticatedSession(req,user,authorization);

    res.status(200).json({
    message: 'Login successful'
});
 }

 const logout = async (req, res) => {
    await SessionService.destroySession(req);
    res.status(200).json({
    message: 'Logout successful'
});
 }

 export { login, logout }
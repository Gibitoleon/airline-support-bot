import AuthorizationService from "../services/AuthorizationService.js";
import ForbiddenError from "../errors/Forbiddenerror.js";
export const checkisAdmin = (req, res, next) => {
  const user = req.user;
  const role = "KNOWLEDGE_BASE_ADMIN";
  console.log("KBA AUTHORIZATION:", {
    user: req.user,
    role: req.user?.role,
    roleName: req.user?.role?.name,
    roleType: typeof req.user?.role,
  });
  const isAdmin = AuthorizationService.checkIsRole(role, user);
  if (!isAdmin) {
    throw new ForbiddenError(
      "You do not have permissions to access this resource",
    );
  }
  console.log("ROLE CHECK RESULT:", {
    expected: role,
    actual: user?.role,
    isAdmin,
  });
  next();
};

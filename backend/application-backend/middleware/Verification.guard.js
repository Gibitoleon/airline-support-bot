 import AuthorizationService from "../services/AuthorizationService.js"
 import ForbiddenError from "../errors/Forbiddenerror.js"
  export const checkisAdmin  = (req,res,next) =>{
   const  user = req.user
   const  role  = 'KNOWLEDGE_BASE_ADMIN'
   const isAdmin = AuthorizationService.checkIsRole(role,user)
   if(!isAdmin){
    throw new ForbiddenError("You do not have permissions to access this resource")
   }
   next()
 }
 
import  UserService from "../services/UserService.js";
import { StatusCodes } from "http-status-codes";

 const getStaffUsers = async (req, res) => {
        
            const staffUsers = await UserService.getStaffUsers();
            res.status(StatusCodes.OK).json(staffUsers);
       
 }

export {
    getStaffUsers
}
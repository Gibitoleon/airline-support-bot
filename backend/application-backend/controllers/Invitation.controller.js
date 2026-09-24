import InvitationService from "../services/InvitationService.js";
import { StatusCodes } from "http-status-codes";
  const sendInvitation = async (req, res) => {
    const { email, role, name } = req.body;

    const invitation = await InvitationService.sendInvitation(
        email,
        role,
        name
    );
    
    return res.status(StatusCodes.CREATED).json({
        message: "Invitation created successfully",
        invitation
    });
}

export {sendInvitation}
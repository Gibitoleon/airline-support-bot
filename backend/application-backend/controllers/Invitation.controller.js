
import InvitationService from "../services/InvitationService.js";
import AuthenticationService from "../services/AuthenticationService.js";
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
};
const getAllInvitations = async (req,res) => {
     const invitations =  await InvitationService.getAllInvitations()
      return res.status(StatusCodes.OK).json({
        success:true,
        message: "Invitations fetched successfully",
        invitations
    });

}
const acceptInvitation = async (req, res) => {
    const { token, password } = req.body;

    const invitation =
        await InvitationService.validateInvitation(token);

    const user = await AuthenticationService.createUser({
        email: invitation.email,
        password,
        roleId: invitation.role_id
    });

    await InvitationService.markInvitationAsAccepted(
        invitation.id
    );

    return res.status(StatusCodes.CREATED).json({
        message: "Staff account created successfully"
    });
};

export {
    sendInvitation,
    acceptInvitation,
    getAllInvitations
};


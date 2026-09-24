import "dotenv/config"
export const generateInvitationUrl = (token) => {
    return `${process.env.FRONTEND_URL}/accept-invitation?token=${token}`;
};
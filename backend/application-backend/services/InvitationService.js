import db from "../models/index.js";
import RoleService from "./RoleService.js";
import emailQueue from "../queues/email.queue.js";
import BadRequestError from "../errors/BadRequesterror.js";

import {
    generateToken,
    hashToken,
    verifyToken
} from "../utils/token.js";

import { generateInvitationUrl } from "../utils/url.js";
import { calculateExpiry } from "../utils/date.js";
import { isValidEmail } from "../utils/email.js";

const { UserInvitation } = db;

export default class InvitationService {

    static generateInvitationToken() {
        return generateToken();
    }

    static async hashInvitationToken(token) {
        return await hashToken(token);
    }

    static async verifyInvitationToken(token, hashedToken) {
        return await verifyToken(token, hashedToken);
    }

    static async createUserInvitation(
        email,
        roleId,
        hashedToken,
        expiresAt,
        status = "PENDING"
    ) {
        return await UserInvitation.create({
            email,
            role_id: roleId,
            token_hash: hashedToken,
            expires_at: expiresAt,
            status
        });
    }

    static async sendInvitation(email, roleName, name) {

        // Validate the email before doing any invitation work.
        if (!isValidEmail(email)) {
            throw new BadRequestError("Invalid email address");
        }

        // Resolve the role name to the actual Role record.
        const role = await RoleService.getRoleByName(roleName);

        if (!role) {
            throw new BadRequestError("Invalid role");
        }

        // Generate the raw token that will be sent to the staff member.
        const token = this.generateInvitationToken();

        // Store only the hashed version in the database.
        const hashedToken = await this.hashInvitationToken(token);

        // Invitation remains valid for 24 hours.
        const expiresAt = calculateExpiry(24);

        // Save the invitation using the role's database ID.
        const invitation = await this.createUserInvitation(
            email,
            role.id,
            hashedToken,
            expiresAt
        );

        // Generate the URL containing the raw token.
        const invitationLink = generateInvitationUrl(token);

        // Queue the email for the worker to process.
        await emailQueue.add("send-invitation", {
            to: email,
            name,
            invitationLink
        });

        return invitation;
    }
}
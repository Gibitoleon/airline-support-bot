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
import { calculateExpiry, isExpired } from "../utils/date.js";
import { isValidEmail } from "../utils/email.js";

const { UserInvitation } = db;

export default class InvitationService {

    static generateInvitationSelector() {
        return generateToken(16);
    }

    static generateInvitationSecret() {
        return generateToken(32);
    }

    static async hashInvitationToken(secret) {
        return await hashToken(secret);
    }

    static async verifyInvitationToken(secret, hashedToken) {
        return await verifyToken(secret, hashedToken);
    }

    static async createUserInvitation(
        email,
        roleId,
        tokenSelector,
        hashedToken,
        expiresAt,
        status = "PENDING"
    ) {
        return await UserInvitation.create({
            email,
            role_id: roleId,
            token_selector: tokenSelector,
            token_hash: hashedToken,
            expires_at: expiresAt,
            status
        });
    }

    static splitInvitationToken(token) {
        const [selector, secret] = token.split(".");

        return {
            selector,
            secret
        };
    }

    static async findInvitationByToken(token) {
        const { selector } = this.splitInvitationToken(token);

        return await UserInvitation.findOne({
            where: {
                token_selector: selector,
                status: "PENDING"
            }
        });
    }

    static async validateInvitation(token) {
        const { secret } = this.splitInvitationToken(token);

        const invitation = await this.findInvitationByToken(token);

        if (!invitation) {
            throw new BadRequestError(
                "Invalid or already accepted invitation"
            );
        }

        if (isExpired(invitation.expires_at)) {
            throw new BadRequestError(
                "Invitation has expired"
            );
        }

        const isValidToken = await this.verifyInvitationToken(
            secret,
            invitation.token_hash
        );

        if (!isValidToken) {
            throw new BadRequestError(
                "Invalid invitation token"
            );
        }

        return invitation;
    }

    static async markInvitationAsAccepted(invitationId) {
        return await UserInvitation.update(
            {
                status: "ACCEPTED"
            },
            {
                where: {
                    id: invitationId
                }
            }
        );
    }

    static async sendInvitation(email, roleName, name) {

        if (!isValidEmail(email)) {
            throw new BadRequestError("Invalid email address");
        }

        const role = await RoleService.getRoleByName(roleName);

        if (!role) {
            throw new BadRequestError("Invalid role");
        }

        const selector = this.generateInvitationSelector();

        const secret = this.generateInvitationSecret();

        const hashedToken = await this.hashInvitationToken(secret);

        const expiresAt = calculateExpiry(24);

        const invitation = await this.createUserInvitation(
            email,
            role.id,
            selector,
            hashedToken,
            expiresAt
        );

        const token = `${selector}.${secret}`;

        const invitationLink = generateInvitationUrl(token);

        await emailQueue.add("send-invitation", {
            to: email,
            name,
            invitationLink
        });

        return invitation;
    }
}
import db from "../../models/index.js";

const { Document } = db;

export default class DocumentAnalyticsService {

    static async getOverview() {

        const totalDocuments = await Document.count();

        const activeDocuments = await Document.count({
            where: {
                status: "ACTIVE"
            }
        });

        return {
            totalDocuments,
            activeDocuments
        };
    }

    static async getDocumentsByDomain() {

        return await Document.findAll({
            attributes: [
                "domain",
                [
                    db.sequelize.fn(
                        "COUNT",
                        db.sequelize.col("id")
                    ),
                    "count"
                ]
            ],
            group: ["domain"],
            order: [["count", "DESC"]],
            raw: true
        });
    }

    static async getDocumentsByStatus() {

        return await Document.findAll({
            attributes: [
                "status",
                [
                    db.sequelize.fn(
                        "COUNT",
                        db.sequelize.col("id")
                    ),
                    "count"
                ]
            ],
            group: ["status"],
            order: [["status", "ASC"]],
            raw: true
        });
    }

    static async getDocumentsByAccess() {

        return await Document.findAll({
            attributes: [
                "access",
                [
                    db.sequelize.fn(
                        "COUNT",
                        db.sequelize.col("id")
                    ),
                    "count"
                ]
            ],
            group: ["access"],
            order: [["access", "ASC"]],
            raw: true
        });
    }

    static async getDashboardAnalytics() {

        const [
            overview,
            documentsByDomain,
            documentsByStatus,
            documentsByAccess
        ] = await Promise.all([
            this.getOverview(),
            this.getDocumentsByDomain(),
            this.getDocumentsByStatus(),
            this.getDocumentsByAccess()
        ]);

        return {
            overview,
            documentsByDomain,
            documentsByStatus,
            documentsByAccess
        };
    }
}
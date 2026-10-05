import db from "../../models/index.js";

const { Query } = db;

export default class QueryAnalyticsService {

    static async getOverview() {

        const totalQueries = await Query.count();

        const answeredQueries = await Query.count({
            where: {
                status: "answered"
            }
        });

        const pendingQueries = await Query.count({
            where: {
                status: "pending"
            }
        });

        return {
            totalQueries,
            answeredQueries,
            pendingQueries
        };
    }

   

    static async getQueriesByStatus() {

        return await Query.findAll({
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

    static async getDailyQueryVolume() {

        return await Query.findAll({
            attributes: [
                [
                    db.sequelize.fn(
                        "DATE",
                        db.sequelize.col("created_at")
                    ),
                    "date"
                ],
                [
                    db.sequelize.fn(
                        "COUNT",
                        db.sequelize.col("id")
                    ),
                    "count"
                ]
            ],
            group: [
                db.sequelize.fn(
                    "DATE",
                    db.sequelize.col("created_at")
                )
            ],
            order: [
                [
                    db.sequelize.fn(
                        "DATE",
                        db.sequelize.col("created_at")
                    ),
                    "ASC"
                ]
            ],
            raw: true
        });
    }

    static async getDashboardAnalytics() {

        const [
            overview,
            queriesByStatus,
            dailyQueryVolume
        ] = await Promise.all([
            this.getOverview(),
            this.getQueriesByStatus(),
            this.getDailyQueryVolume()
        ]);

        return {
            overview,
            queriesByStatus,
            dailyQueryVolume
        };
    }
}
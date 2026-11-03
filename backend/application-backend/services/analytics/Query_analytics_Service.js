import db from "../../models/index.js";

const { Query } = db;

export default class QueryAnalyticsService {
  static async getOverview() {
    // Wrap in Number()
    const totalQueries = Number(await Query.count());
    const answeredQueries = Number(
      await Query.count({
        where: { status: "answered" },
      }),
    );
    const pendingQueries = Number(
      await Query.count({
        where: { status: "pending" },
      }),
    );

    return {
      totalQueries,
      answeredQueries,
      pendingQueries,
    };
  }

  static async getQueriesByStatus() {
    return await Query.findAll({
      attributes: [
        "status",
        [
          // FIX: Cast the COUNT to INTEGER
          db.sequelize.cast(
            db.sequelize.fn("COUNT", db.sequelize.col("id")),
            "INTEGER",
          ),
          "count",
        ],
      ],
      group: ["status"],
      order: [["status", "ASC"]],
      raw: true,
    });
  }

  static async getDailyQueryVolume() {
    return await Query.findAll({
      attributes: [
        [db.sequelize.fn("DATE", db.sequelize.col("created_at")), "date"],
        [
          // FIX: Cast the COUNT to INTEGER
          db.sequelize.cast(
            db.sequelize.fn("COUNT", db.sequelize.col("id")),
            "INTEGER",
          ),
          "count",
        ],
      ],
      group: [db.sequelize.fn("DATE", db.sequelize.col("created_at"))],
      order: [[db.sequelize.fn("DATE", db.sequelize.col("created_at")), "ASC"]],
      raw: true,
    });
  }

  static async getDashboardAnalytics() {
    const [overview, queriesByStatus, dailyQueryVolume] = await Promise.all([
      this.getOverview(),
      this.getQueriesByStatus(),
      this.getDailyQueryVolume(),
    ]);

    return {
      overview,
      queriesByStatus,
      dailyQueryVolume,
    };
  }
}

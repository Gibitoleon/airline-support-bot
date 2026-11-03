import db from "../../models/index.js";

const { Document } = db;

export default class DocumentAnalyticsService {
  static async getOverview() {
    // Wrap in Number() to ensure they are numbers
    const totalDocuments = Number(await Document.count());
    const activeDocuments = Number(
      await Document.count({
        where: { status: "ACTIVE" },
      }),
    );

    return {
      totalDocuments,
      activeDocuments,
    };
  }

  static async getDocumentsByDomain() {
    return await Document.findAll({
      attributes: [
        "domain",
        [
          // FIX: Cast the COUNT to INTEGER
          db.sequelize.cast(
            db.sequelize.fn("COUNT", db.sequelize.col("id")),
            "INTEGER",
          ),
          "count",
        ],
      ],
      group: ["domain"],
      order: [["count", "DESC"]],
      raw: true,
    });
  }

  static async getDocumentsByStatus() {
    return await Document.findAll({
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

  static async getDocumentsByAccess() {
    return await Document.findAll({
      attributes: [
        "access",
        [
          // FIX: Cast the COUNT to INTEGER
          db.sequelize.cast(
            db.sequelize.fn("COUNT", db.sequelize.col("id")),
            "INTEGER",
          ),
          "count",
        ],
      ],
      group: ["access"],
      order: [["access", "ASC"]],
      raw: true,
    });
  }

  static async getDashboardAnalytics() {
    const [overview, documentsByDomain, documentsByStatus, documentsByAccess] =
      await Promise.all([
        this.getOverview(),
        this.getDocumentsByDomain(),
        this.getDocumentsByStatus(),
        this.getDocumentsByAccess(),
      ]);

    return {
      overview,
      documentsByDomain,
      documentsByStatus,
      documentsByAccess,
    };
  }
}

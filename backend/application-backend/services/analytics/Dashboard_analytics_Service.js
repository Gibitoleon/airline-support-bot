import QueryAnalyticsService from "./Query_analytics_Service.js";
import DocumentAnalyticsService from "./Document_analytics_Service.js";

export default class DashboardAnalyticsService {

    static async getDashboardAnalytics() {

        const [
            queryAnalytics,
            documentAnalytics
        ] = await Promise.all([
            QueryAnalyticsService.getDashboardAnalytics(),
            DocumentAnalyticsService.getDashboardAnalytics()
        ]);

        return {
            queries: queryAnalytics,
            documents: documentAnalytics
        };
    }
}
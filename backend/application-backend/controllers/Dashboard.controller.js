import DashboardAnalyticsService from "../services/analytics/Dashboard_analytics_Service.js";
import { StatusCodes } from "http-status-codes";

const getDashboardAnalytics = async (req, res) => {

    const analytics =
        await DashboardAnalyticsService.getDashboardAnalytics();

    return res.status(StatusCodes.OK).json({
        status: "SUCCESS",
        analytics
    });
};

export {
    getDashboardAnalytics
};
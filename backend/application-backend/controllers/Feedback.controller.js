import { StatusCodes } from "http-status-codes";
import FeedbackService from "../services/FeedbackService.js";
const createFeedback = async (req, res) => {
  const { queryId } = req.params;
  const { rating, comment } = req.body;
  const sessionId = req.sessionID;
  console.log(sessionId);
  console.log(queryId, rating, comment);
  await FeedbackService.createFeedback(queryId, rating, comment, sessionId);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "feedback sent" });
};

const getallFeedback = async (req, res) => {
  const Feedbacks = await FeedbackService.getAllFeedback();
  return res.status(StatusCodes.OK).json({ success: true, Feedbacks });
};

export { createFeedback, getallFeedback };

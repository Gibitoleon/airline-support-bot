 import { StatusCodes } from 'http-status-codes';
 import FeedbackService from '../services/FeedbackService.js';
 const createFeedback = async(req,res)=>{
   const { queryId } = req.params;
   const { rating, comment } = req.body;
   console.log(queryId,rating,comment)
   await FeedbackService.createFeedback(
      queryId,
      rating,
      comment
   );
  return res.status(StatusCodes.CREATED).json({success:true,message:"feedback created"})
 }

 const getallFeedback = async(req,res) => {
   const Feedbacks = await FeedbackService.getAllFeedback()
    return res.status(StatusCodes.OK).json({success:true, Feedbacks})
 }

 export {createFeedback, getallFeedback} ;
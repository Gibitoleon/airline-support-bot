import { StatusCodes } from "http-status-codes";
import axios from "axios";

const healthCheck = async (req, res) => {
  try {
    console.log(process.env.RAG_SERVICE_URL);
    const ragResponse = await axios.get(
      `${process.env.RAG_SERVICE_URL}/health`,
      { timeout: 5000 },
    );

    return res.status(StatusCodes.OK).json({
      status: "healthy",
      services: {
        backend: "healthy",
        rag: ragResponse.data.status,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      status: "unhealthy",
      services: {
        backend: "healthy",
        rag: "unavailable",
      },
    });
  }
};

export default healthCheck;

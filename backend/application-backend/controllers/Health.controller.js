import { StatusCodes } from "http-status-codes";
import axios from "axios";

const RAG = process.env.RAG_SERVICE_URL;

const healthCheck = async (req, res) => {
  try {
    const ragResponse = await axios.get(`${RAG}/health`, { timeout: 15000 });
    return res
      .status(StatusCodes.OK)
      .set("Cache-Control", "no-store")
      .json({
        status: "healthy",
        services: { backend: "healthy", rag: ragResponse.data.status },
      });
  } catch (error) {
    axios.get(`${RAG}/health`, { timeout: 90000 }).catch(() => {});

    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .set("Cache-Control", "no-store")
      .json({
        status: "unhealthy",
        services: { backend: "healthy", rag: "unavailable" },
      });
  }
};

export default healthCheck;

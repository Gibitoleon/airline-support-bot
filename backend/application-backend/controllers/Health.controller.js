import { StatusCodes } from "http-status-codes";
import axios from "axios";

const RAG_RAW = process.env.RAG_SERVICE_URL;
// Render's internal hostport has no scheme (e.g. "airline-support-rag:10000").
// Normalize so both "https://..." and "host:port" work.
const RAG = RAG_RAW
  ? RAG_RAW.startsWith("http")
    ? RAG_RAW
    : `http://${RAG_RAW}`
  : null;

const healthCheck = async (req, res) => {
  if (!RAG) {
    console.error("RAG_SERVICE_URL is not set");
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .set("Cache-Control", "no-store")
      .json({
        status: "unhealthy",
        services: { backend: "healthy", rag: "unconfigured" },
      });
  }

  try {
    const ragResponse = await axios.get(`${RAG}/health`, { timeout: 3000 });
    return res
      .status(StatusCodes.OK)
      .set("Cache-Control", "no-store")
      .json({
        status: "healthy",
        services: { backend: "healthy", rag: ragResponse.data.status },
      });
  } catch (error) {
    // Log the real reason — this is what you'll see in Render's backend logs
    // when the widget is stuck on "Warming up".
    console.warn("RAG health failed:", error.code || error.message);

    // Fire-and-forget wake. The request itself triggers Render to boot RAG.
    // 90s timeout covers a cold start; we don't wait for the response.
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

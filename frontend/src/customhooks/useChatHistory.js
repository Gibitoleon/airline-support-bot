import useCustomQuery from "./useQuery.js";

const useChatHistory = ({ enabled = true } = {}) => {
  return useCustomQuery(["chat-history"], "/chat/getchats", {
    enabled,
    staleTime: 30 * 1000, // 30s
    select: (data) => {
      const context = data?.conversationContext ?? [];
      const messages = [];

      // Each context item has { question, response }
      // Flatten into the widget's { id, role, text } message format
      context.forEach((item, index) => {
        messages.push({
          id: `q-${index}`,
          role: "user",
          text: item.question,
        });
        messages.push({
          id: `a-${index}`,
          role: "assistant",
          text: item.response,
        });
      });

      return messages;
    },
  });
};

export default useChatHistory;

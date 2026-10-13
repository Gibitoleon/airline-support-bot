import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useChatQuery = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Couldn't reach the assistant. Please try again.",
      );
    },
  });

  const sendQuery = ({ query }) => {
    mutation.mutate(
      {
        url: "/chat/sendchatQuery",
        method: "POST",
        info: { query },
      },
      {
        onSuccess: () => {
          // Mark history stale so next read is fresh
          queryClient.invalidateQueries({ queryKey: ["chat-history"] });
        },
      },
    );
  };

  return {
    sendQuery,
    isPending: mutation.isPending,
  };
};

export default useChatQuery;

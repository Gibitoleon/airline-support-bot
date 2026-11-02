import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useCreateFeedback = ({ onSuccess } = {}) => {
  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Thank you for your feedback!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit feedback.",
      );
    },
  });

  const submitFeedback = ({ queryId, rating, comment }) => {
    mutation.mutate({
      url: `/feedback/queries/${queryId}/feedback`,
      method: "POST",
      info: { rating, comment },
    });
  };

  return {
    submitFeedback,
    isPending: mutation.isPending,
  };
};

export default useCreateFeedback;

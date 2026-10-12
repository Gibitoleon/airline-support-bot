import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useCreateGroup = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Group created");

      // Refetch the groups list so the new group appears
      queryClient.invalidateQueries({ queryKey: ["groups"] });

      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create group");
    },
  });

  const createGroup = ({ name }) => {
    mutation.mutate({
      url: "/group/creategroup",
      method: "POST",
      info: { name },
    });
  };

  return {
    createGroup,
    isPending: mutation.isPending,
  };
};

export default useCreateGroup;

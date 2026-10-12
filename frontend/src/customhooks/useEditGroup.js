import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useUpdateGroup = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Group updated");

      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update group");
    },
  });

  const updateGroup = ({ groupId, name }) => {
    mutation.mutate(
      {
        url: `/group/updategroup/${groupId}`,
        method: "PATCH",
        info: { name },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
      },
    );
  };

  return {
    updateGroup,
    isPending: mutation.isPending,
  };
};

export default useUpdateGroup;

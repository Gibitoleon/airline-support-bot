import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useAddUserToGroup = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "User added to group");

      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add user to group",
      );
    },
  });

  const addUserToGroup = ({ userId, groupId }) => {
    mutation.mutate(
      {
        url: `/usergroups/user/${userId}/groups`,
        method: "POST",
        info: { groupId: String(groupId) },
      },
      {
        onSuccess: (data, variables) => {
          // Invalidate this user's group list so it refetches
          queryClient.invalidateQueries({
            queryKey: ["user-groups", String(userId)],
          });
        },
      },
    );
  };

  return {
    addUserToGroup,
    isPending: mutation.isPending,
  };
};

export default useAddUserToGroup;

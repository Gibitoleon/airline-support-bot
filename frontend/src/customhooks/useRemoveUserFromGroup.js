import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useRemoveUserFromGroup = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "User removed from group");

      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove user from group",
      );
    },
  });

  const removeUserFromGroup = ({ userId, groupId }) => {
    mutation.mutate(
      {
        url: `/usergroups/user/${userId}/groups/${groupId}`,
        method: "DELETE",
      },
      {
        onSuccess: () => {
          // Refetch this user's group list
          queryClient.invalidateQueries({
            queryKey: ["user-groups", String(userId)],
          });
          // Refetch the staff list so the group count updates
          queryClient.invalidateQueries({
            queryKey: ["staff-users"],
          });
        },
      },
    );
  };

  return {
    removeUserFromGroup,
    isPending: mutation.isPending,
  };
};

export default useRemoveUserFromGroup;

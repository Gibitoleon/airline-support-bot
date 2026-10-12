import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useRemoveGroupPermission = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Permission removed from group");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove permission",
      );
    },
  });

  const removeGroupPermission = ({ groupId, permissionId }) => {
    mutation.mutate(
      {
        url: `/group/${groupId}/removepermission/${permissionId}`,
        method: "DELETE",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["group-permissions", String(groupId)],
          });
        },
      },
    );
  };

  return {
    removeGroupPermission,
    isPending: mutation.isPending,
  };
};

export default useRemoveGroupPermission;

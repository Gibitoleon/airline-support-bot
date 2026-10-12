import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useAddGroupPermission = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Permission added to group");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add permission");
    },
  });

  const addGroupPermission = ({ groupId, permissionId }) => {
    mutation.mutate(
      {
        url: `/group/${groupId}/addpermission`,
        method: "POST",
        info: { permissionId: String(permissionId) },
      },
      {
        onSuccess: () => {
          // Refetch this group's permissions
          queryClient.invalidateQueries({
            queryKey: ["group-permissions", String(groupId)],
          });
        },
      },
    );
  };

  return {
    addGroupPermission,
    isPending: mutation.isPending,
  };
};

export default useAddGroupPermission;

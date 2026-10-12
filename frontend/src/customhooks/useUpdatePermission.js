import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useUpdatePermission = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Permission updated");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update permission",
      );
    },
  });

  const updatePermission = ({ permissionId, name }) => {
    mutation.mutate({
      url: `/permission/updatepermission/${permissionId}`,
      method: "PATCH",
      info: { name },
    });
  };

  return {
    updatePermission,
    isPending: mutation.isPending,
  };
};

export default useUpdatePermission;

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useCreatePermission = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Permission created");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to create permission",
      );
    },
  });

  const createPermission = ({ name }) => {
    mutation.mutate({
      url: "/permission/createpermission",
      method: "POST",
      info: { name },
    });
  };

  return {
    createPermission,
    isPending: mutation.isPending,
  };
};

export default useCreatePermission;

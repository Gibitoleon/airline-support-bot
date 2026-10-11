import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useCreateInvitation = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Invitation sent");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to send invitation",
      );
    },
  });

  const createInvitation = ({ email, role, name }) => {
    mutation.mutate({
      url: "/invitation/sendInvitation",
      method: "POST",
      info: { email, role, name },
    });
  };

  return {
    createInvitation,
    isPending: mutation.isPending,
  };
};

export default useCreateInvitation;

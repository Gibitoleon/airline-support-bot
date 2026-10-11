import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";

const useAcceptInvitation = () => {
  const navigate = useNavigate();

  const mutation = useCustommutation({
    onSuccess: (data) => {
      toast.success(
        data?.message || "Account activated. You can sign in now."
      );
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Invalid or expired invitation link."
      );
    },
  });

  const acceptInvitation = ({ token, password }) => {
    mutation.mutate({
      url: "/invitation/acceptInvitation",
      method: "POST",
      info: { token, password },
    });
  };

  return {
    acceptInvitation,
    isPending: mutation.isPending,
  };
};

export default useAcceptInvitation;
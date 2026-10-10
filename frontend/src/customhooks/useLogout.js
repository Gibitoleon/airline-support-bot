import { useNavigate } from "react-router-dom";
import useCustommutation from "./useMutation.js";
import useAuthStore from "../stores/useLoginStore.js";

const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);

  const mutation = useCustommutation({
    onSuccess: () => {
      clearUser();
      navigate("/login", { replace: true });
    },
    onError: () => {
      // Log out on the client even if the server call fails
      clearUser();
      navigate("/login", { replace: true });
    },
  });

  const logout = () =>
    mutation.mutate({
      url: "/auth/logout",
      method: "POST",
    });

  return {
    logout,
    isPending: mutation.isPending,
  };
};

export default useLogout;
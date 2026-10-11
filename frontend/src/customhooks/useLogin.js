import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCustommutation from "./useMutation.js";
import useAuthStore from "../stores/useLoginStore.js";

const useLogin = () => {
  const navigate = useNavigate();
  const setAuthUser = useAuthStore((state) => state.setUser);

  const mutation = useCustommutation({
    onSuccess: (data) => {
      const { message, user } = data;

      toast.success(message);
      setAuthUser(user);

      // Route by role
      if (user.role === "KNOWLEDGE_BASE_ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });

  const login = ({ email, password }) => {
    if (!email?.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    mutation.mutate({
      url: "/auth/login",
      method: "POST",
      info: { email, password },
    });
  };

  return {
    login,
    isPending: mutation.isPending,
  };
};

export default useLogin;

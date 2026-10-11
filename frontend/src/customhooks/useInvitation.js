import useCustomQuery from "./useQuery.js";

const useInvitations = () => {
  return useCustomQuery(["invitations"], "/invitation/getInvitations", {
    staleTime: 60 * 1000, // 1 min
    select: (data) =>
      (data?.invitations ?? []).map((inv) => {
        const { expires_at, created_at, updated_at, role_id, role, ...rest } =
          inv;

        return {
          ...rest,
          roleId: role_id,
          role: role?.name ?? "Unknown",
          expiresAt: expires_at,
          createdAt: created_at,
          updatedAt: updated_at,
        };
      }),
  });
};

export default useInvitations;

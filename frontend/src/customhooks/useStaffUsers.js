import useCustomQuery from "./useQuery.js";

const useStaffUsers = () => {
  return useCustomQuery(["staff-users"], "/user/getStaff", {
    staleTime: 60 * 1000,
    select: (data) =>
      (Array.isArray(data) ? data : []).map((user) => ({
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
        role: user.role?.name ?? "STAFF",
        groupCount: Number(user.groupCount ?? 0),
      })),
  });
};

export default useStaffUsers;

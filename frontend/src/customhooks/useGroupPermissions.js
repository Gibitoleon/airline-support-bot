import useCustomQuery from "./useQuery.js";

const useGroupPermissions = (groupId) => {
  return useCustomQuery(
    ["group-permissions", groupId],
    `/group/${groupId}/getpermissions`,
    {
      enabled: !!groupId,
      staleTime: 60 * 1000,
      select: (data) => data?.permissions ?? [],
    }
  );
};

export default useGroupPermissions;
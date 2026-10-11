import useCustomQuery from "./useQuery.js";

const useUserGroups = (userId) => {
  return useCustomQuery(
    ["user-groups", userId],
    `/usergroups/user/${userId}/groups`,
    {
      enabled: !!userId, // don't fire until we have a userId
      staleTime: 60 * 1000,
      select: (data) => data?.groups ?? [],
    }
  );
};

export default useUserGroups;
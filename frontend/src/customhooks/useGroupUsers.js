import useCustomQuery from "./useQuery";

const useGroupUsers = (groupId) => {
  return useCustomQuery(
    ["group-users", groupId],
    `/usergroups/group/${groupId}/users`,
    {
      enabled: !!groupId,
      staleTime: 60 * 1000,
      select: (data) => data?.users?.users ?? [],
    }
  );
};

export default useGroupUsers;
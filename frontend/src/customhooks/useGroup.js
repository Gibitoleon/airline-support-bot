import useCustomQuery from "./useQuery.js";

const useGroups = () => {
  return useCustomQuery(["groups"], "/group/getgroups", {
    staleTime: 60 * 1000,
    select: (data) => data?.groups ?? [],
  });
};

export default useGroups;

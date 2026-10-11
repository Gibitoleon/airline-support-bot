import useCustomQuery from "./useQuery";

const usePermissions = () => {
  return useCustomQuery(["permissions"], "/permission/getpermissions", {
    staleTime: 5 * 60 * 1000, 
    select: (data) => data?.permissions ?? [],
  });
};

export default usePermissions;
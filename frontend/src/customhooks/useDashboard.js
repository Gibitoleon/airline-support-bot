import useCustomQuery from "./useQuery.js";

const useDashboard = () => {
  return useCustomQuery(["dashboard-analytics"], "/dashboard/analytics", {
    staleTime: 5 * 60 * 1000, 
  });
};

export default useDashboard;
import useCustomQuery from "./useQuery.js";

const useRagHealth = ({ enabled = true } = {}) => {
  return useCustomQuery(["rag-health"], "/health/gethealth", {
    enabled,
    staleTime: 0,
    retry: false,
    refetchInterval: (query) => {
      const rag = query.state.data?.services?.rag;
      return rag === "healthy" ? false : 8000;
    },
    refetchIntervalInBackground: false,
  });
};

export default useRagHealth;

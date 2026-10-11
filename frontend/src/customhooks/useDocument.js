import useCustomQuery from "./useQuery";

const useDocuments = () => {
  return useCustomQuery(["documents"], "/document/getdocuments", {
    staleTime: 60 * 1000, // 1 min
    select: (data) => data?.documents ?? [],
  });
};

export default useDocuments;
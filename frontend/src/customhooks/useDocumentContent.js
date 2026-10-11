import useCustomQuery from "./useQuery";

const useDocumentContent = (documentId) => {
  return useCustomQuery(
    ["document-content", documentId],
    `/document/getdocumentcontent/${documentId}`,
    {
      enabled: !!documentId, // don't fetch until we have an ID
      staleTime: 5 * 60 * 1000, // 5 min — document content is stable
      select: (data) => data?.content ?? null,
    }
  );
};

export default useDocumentContent;
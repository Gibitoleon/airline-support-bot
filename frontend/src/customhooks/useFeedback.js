import useCustomQuery from "./useQuery";

const useFeedback = () => {
  return useCustomQuery(["feedback"], "/feedback/getallFeedback", {
    staleTime: 60 * 1000, 
    select: (data) => data?.Feedbacks ?? [],
  });
};

export default useFeedback;
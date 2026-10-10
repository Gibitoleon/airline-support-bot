import { useQuery } from "@tanstack/react-query";
import FetchApi from "../utils/fetch.js";

 const useCustomQuery = (querykey, url, options = {}) => {
  return useQuery({
    queryKey: Array.isArray(querykey) ? querykey: [querykey],
    queryFn: () => FetchApi(url),
    retry: false,
    ...options,
  });
};

export default useCustomQuery
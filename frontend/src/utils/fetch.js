import axios from "axios";

axios.defaults.withCredentials = true;

// Prod only: retry 502/503/504 on real requests (cold-start cover).
// Skipped in dev so errors surface instantly and HMR doesn't stack interceptors.
if (!import.meta.env.DEV) {
  const interceptorId = axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const cfg = err.config;
      if (!cfg) return Promise.reject(err);

      // Health checks are managed by the polling loop — don't retry here.
      if (cfg.url?.includes("/health")) return Promise.reject(err);

      if (![502, 503, 504].includes(err.response?.status)) {
        return Promise.reject(err);
      }

      // 6 attempts, 15s apart ≈ 90s total budget.
      cfg.__retry = (cfg.__retry || 0) + 1;
      if (cfg.__retry > 6) return Promise.reject(err);

      await new Promise((r) => setTimeout(r, 15000));
      return axios(cfg);
    },
  );

  if (import.meta.hot) {
    import.meta.hot.dispose(() =>
      axios.interceptors.response.eject(interceptorId),
    );
  }
}

const FetchApi = async (url, method = "GET", info) => {
  const config = {
    url,
    method,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
  };
  if (method !== "GET" && method !== "DELETE") {
    config.data = info;
  }

  const { data } = await axios(config);
  return data;
};

export default FetchApi;

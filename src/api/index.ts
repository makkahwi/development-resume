import axios from "axios";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  async (config) => {
    const now = new Date();

    if (["post"].includes(config.method || "")) {
      config.data = {
        ...config.data,
        created_at: now,
        updated_at: now,
      };
    }

    if (["post", "put", "patch"].includes(config.method || "")) {
      config.data = {
        ...config.data,
        updated_at: now,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (res) => {
    if ([200, 201, 204].includes(res.status)) {
      return res.data;
    }

    return Promise.reject(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const getAll = async (table = "") => {
  return await service.get(`${table}.json`).then((res) => {
    const data = res
      ? Object.entries(res).map(([id, values]) => ({ id, ...values }))
      : [];
    return data;
  });
};

const get = async (table = "", id = "") => {
  return await service.get(`${table}/${id}.json`).then((res: any) => {
    return { value: res.x };
  });
};

const create = async (table = "", data = {}) => {
  return await service.post(`${table}.json`, data);
};

export { getAll, get, create };

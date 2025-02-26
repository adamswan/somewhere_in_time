import axios, { AxiosResponse } from "axios";
import Apis from "../apis/api";

interface RequestFun {
  (name: string, params: any): Promise<AxiosResponse<any, any>>;
}

interface GetFun {
  (url: string, params: any): Promise<AxiosResponse<any, any>>;
}

interface PostFun {
  (url: string, params: any): Promise<AxiosResponse<any, any>>;
}

const instance = axios.create({
  baseURL: "http://192.168.1.103:7001",
  timeout: 10 * 1000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;
      if (status >= 500) {
        // 服务端报错
      } else if (status === 400) {
        // 接口参数异常
      } else if (status === 401) {
        // 登陆信息过期，需要重新登陆
      } else {
        // 其它错误类型，统一按照接口报错处理
      }
    } else {
      // 网络异常
    }
    return Promise.reject(error);
  }
);

export const request: RequestFun = (name, params) => {
  const api = (Apis as any)[name];

  const { url, method } = api;

  if (method === "get") {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

export const get: GetFun = (url, params) => {
  return instance.get(url, {
    params: params,
  });
};

export const post: PostFun = (url, params) => {
  return instance.post(url, params);
};

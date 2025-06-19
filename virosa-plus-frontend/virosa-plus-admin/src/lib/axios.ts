import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt/constant';

// ----------------------------------------------------------------------

// 创建一个新的axios实例
const axiosInstance = axios.create({
  baseURL: '/api', // 基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从localStorage获取token并添加到请求头
    const token = localStorage.getItem(JWT_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 即使HTTP状态是200，也检查响应体中是否有错误码
    if (response.data && typeof response.data === 'object') {
      const data = response.data;

      // 检查响应体中的错误码（只有200表示成功）
      if (data.code !== undefined && data.code !== 200) {
        // 创建包含响应数据的错误对象
        const error = new Error(data.msg || 'API返回了错误状态码');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error.response = response;
        return Promise.reject(error);
      }
    }

    return response;
  },
  (error) => {
    // 处理401错误，表示未授权（token无效或过期）
    if (error.response && error.response.status === 401) {
      console.error('未授权访问，请重新登录');
      // 清除token并重定向到登录页
      localStorage.removeItem(JWT_STORAGE_KEY);
      window.location.href = '/auth/jwt/sign-in';
      return Promise.reject(new Error('未授权，请重新登录'));
    }

    // 处理403错误，表示权限不足
    if (error.response && error.response.status === 403) {
      console.error('权限不足，无法访问该资源');
      return Promise.reject(new Error('您没有权限访问此资源'));
    }

    // 增强错误信息
    const errorMessage =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      '请求失败，请检查网络连接';

    console.error('API请求失败:', errorMessage, error);

    // 创建新的错误对象，包含更详细的信息
    const enhancedError = new Error(errorMessage);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    enhancedError.originalError = error;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    enhancedError.response = error.response;

    return Promise.reject(enhancedError);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

// API端点配置 - 注意这些路径已经不需要再包含 /api 前缀
export const endpoints = {
  chat: '/chat',
  kanban: '/kanban',
  calendar: '/calendar',
  auth: { me: '/auth/info', signIn: '/auth/login', signUp: '/auth/register' },
  mail: { list: '/mail/list', details: '/mail/details', labels: '/mail/labels' },
  post: {
    list: '/post/list',
    details: '/post/details',
    latest: '/post/latest',
    search: '/post/search',
  },
  product: {
    list: '/product/list',
    details: '/product/details',
    search: '/product/search',
  },
};

// 后端API端点 - 也不需要 /api 前缀，确保不包含admin前缀
export const apiEndpoints = {
  article: {
    list: '/articles/page',
    details: (id: string | number) => `/articles/${id}`,
    create: '/article',
    update: (id: string | number) => `/articles/${id}`,
    delete: (id: string | number) => `/articles/${id}`,
    nodes: (id: string | number) => `/articles/${id}/nodes`,
    unarchived: '/articles/unarchived',
    addToDirectory: (id: string | number) => `/articles/${id}/directory`,
  },
  node: {
    tree: '/nodes/tree',
    list: '/nodes/page',
    details: (id: string | number) => `/nodes/${id}`,
    create: '/nodes',
    update: (id: string | number) => `/nodes/${id}`,
    delete: (id: string | number) => `/nodes/${id}`,
    move: '/nodes/move',
    addArticle: (directoryId: string | number, articleId: string | number) =>
      `/nodes/directory/${directoryId}/articles/${articleId}`,
    removeArticle: (nodeId: string | number) => `/nodes/file/${nodeId}`,
  },
};

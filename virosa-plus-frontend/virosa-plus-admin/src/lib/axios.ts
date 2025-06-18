import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

// ----------------------------------------------------------------------

// 创建 axios 实例，baseURL 指向 /api，这样所有请求都是相对于 Vite 服务器的
const axiosInstance = axios.create({
  baseURL: '/api', // 关键：设置为代理路径前缀
  withCredentials: false,
});

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

// 后端API端点 - 也不需要 /api 前缀
export const apiEndpoints = {
  article: {
    list: '/articles/page',
    details: (id: string | number) => `/articles/${id}`,
    create: '/articles',
    update: (id: string | number) => `/articles/${id}`,
    delete: (id: string | number) => `/articles/${id}`,
    nodes: (id: string | number) => `/articles/${id}/nodes`,
    unarchived: '/articles/unarchived',
    addToDirectory: (id: string | number) => `/articles/${id}/directory`,
  },
  node: {
    list: '/nodes/page',
    tree: '/nodes/tree',
    details: (id: string | number) => `/nodes/${id}`,
    create: '/nodes',
    update: (id: string | number) => `/nodes/${id}`,
    delete: (id: string | number) => `/nodes/${id}`,
    move: (id: string | number, newParentId: string | number) =>
      `/nodes/${id}/parent/${newParentId}`,
    addArticle: (directoryId: string | number, articleId: string | number) =>
      `/nodes/directory/${directoryId}/article/${articleId}`,
    removeArticle: (nodeId: string | number) => `/nodes/file/${nodeId}`,
  },
};

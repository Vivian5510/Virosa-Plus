import type { SWRConfiguration } from 'swr';
import type { IPostItem } from 'src/types/blog';

import useSWR from 'swr';
import { useMemo, useState, useEffect } from 'react';

import { postService, nodeService } from 'src/lib/api-adapter';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// 文章列表专用的SWR选项，允许自动刷新
const postsSwrOptions: SWRConfiguration = {
  revalidateOnFocus: true, // 当页面重新获得焦点时重新验证
  revalidateOnReconnect: true, // 当网络重新连接时重新验证
  dedupingInterval: 5000, // 5秒内不重复请求
};

// ----------------------------------------------------------------------

type PostsData = {
  posts: IPostItem[];
  total: number;
};

export function useGetPosts(params = { pageNum: 1, pageSize: 10, publish: '' }) {
  // 使用自定义fetcher从后端获取数据
  const customFetcher = async () => {
    // 输出请求参数，便于调试
    console.log('获取文章列表, 请求参数:', {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      publish: params.publish,
    });

    try {
      // 执行API请求
      const result = await postService.getPosts({
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        publish: params.publish,
      });

      console.log('获取文章列表结果:', {
        总数: result.total,
        当前页文章数: result.posts.length,
        发布状态: params.publish || 'all',
      });

      // 检查数据有效性
      if (!result.posts || !Array.isArray(result.posts)) {
        console.error('API返回的文章列表格式不正确', result);
        return { posts: [], total: 0 };
      }

      return result;
    } catch (error) {
      console.error('获取文章列表失败:', error);
      return { posts: [], total: 0 };
    }
  };

  // 使用SWR来获取和缓存数据
  const { data, isLoading, error, isValidating, mutate } = useSWR<PostsData>(
    [`articles/page`, params],
    customFetcher,
    postsSwrOptions
  );

  // 调试SWR状态
  console.log('SWR 文章列表状态:', {
    isLoading,
    isValidating,
    hasError: !!error,
    hasData: !!data,
    dataLength: data?.posts?.length || 0
  });

  const memoizedValue = useMemo(
    () => ({
      posts: data?.posts || [],
      total: data?.total || 0,
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.posts.length,
      refetchPosts: () => mutate(), // 添加重新获取数据的函数
    }),
    [data?.posts, data?.total, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PostData = {
  post: IPostItem | null;
};

export function useGetPost(id: string) {
  // 使用ID而不是title获取文章
  const customFetcher = async (url: string) => {
    if (!id) return { post: null };
    const post = await postService.getPostById(id);
    return { post };
  };

  // 使用特定于文章详情的SWR选项，允许自动重新验证
  const postSwrOptions: SWRConfiguration = {
    revalidateOnFocus: true,  // 当页面重新获得焦点时重新验证
    revalidateOnReconnect: true, // 当网络重新连接时重新验证
    dedupingInterval: 5000, // 5秒内不重复请求
  };

  const { data, isLoading, error, isValidating, mutate } = useSWR<PostData>(
    id ? `articles/${id}` : null,
    id ? customFetcher : null,
    postSwrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      post: data?.post,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
      refetchPost: () => mutate(), // 添加重新获取文章的函数
    }),
    [data?.post, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type LatestPostsData = {
  latestPosts: IPostItem[];
};

export function useGetLatestPosts(excludeId?: string) {
  // 获取最新文章，排除指定ID的文章
  const customFetcher = async () => {
    const result = await postService.getPosts({ pageSize: 5, pageNum: 1 });
    const latestPosts = excludeId
      ? result.posts.filter((post: IPostItem) => post.id !== excludeId)
      : result.posts;
    return { latestPosts };
  };

  const { data, isLoading, error, isValidating } = useSWR<LatestPostsData>(
    'articles/latest',
    customFetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      latestPosts: data?.latestPosts || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IPostItem[];
};

export function useSearchPosts(query: string) {
  // 搜索文章
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 减少延迟到300ms，提高响应速度

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const customFetcher = async () => {
    if (!debouncedQuery) return { results: [] };

    // 从API获取所有文章
    const allPosts = await postService.getPosts({ pageSize: 100, pageNum: 1 });

    // 前端实现部分匹配搜索，更加灵活
    const searchTerm = debouncedQuery.toLowerCase().trim();
    const filteredResults = allPosts.posts.filter((post: IPostItem) => {
      // 搜索标题
      if (post.title?.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // 搜索作者
      if (post.author?.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // 搜索标签
      if (post.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))) {
        return true;
      }

      // 搜索文章内容
      if (post.content?.toLowerCase().includes(searchTerm)) {
        return true;
      }

      return false;
    });

    console.log(`搜索关键词 "${searchTerm}" 找到 ${filteredResults.length} 条结果`);

    return { results: filteredResults };
  };

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(
    debouncedQuery ? `articles/search?query=${debouncedQuery}` : null,
    debouncedQuery ? customFetcher : null,
    {
      ...swrOptions,
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 10000, // 10秒内不重复请求
    }
  );

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// 新增：获取未归档文章
export function useGetUnarchivedPosts() {
  const customFetcher = async () => {
    const result = await postService.getUnarchivedPosts();
    return { posts: result.posts, total: result.total || 0 };
  };

  const { data, isLoading, error, isValidating } = useSWR<PostsData>(
    'articles/unarchived',
    customFetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      unarchivedPosts: data?.posts || [],
      unarchivedPostsLoading: isLoading,
      unarchivedPostsError: error,
      unarchivedPostsValidating: isValidating,
      unarchivedPostsEmpty: !isLoading && !data?.posts.length,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// 新增：获取节点树
export function useGetNodeTree() {
  const customFetcher = async () => await nodeService.getNodeTree();

  const { data, isLoading, error, isValidating } = useSWR('nodes/tree', customFetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      nodeTree: data || [],
      nodeTreeLoading: isLoading,
      nodeTreeError: error,
      nodeTreeValidating: isValidating,
      nodeTreeEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

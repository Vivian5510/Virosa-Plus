import type { SWRConfiguration } from 'swr';
import type { IPostItem } from 'src/types/blog';

import useSWR from 'swr';
import { useMemo } from 'react';

import { postService, nodeService } from 'src/lib/api-adapter';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type PostsData = {
  posts: IPostItem[];
};

export function useGetPosts() {
  // 使用自定义fetcher从后端获取数据
  const customFetcher = async () => {
    const result = await postService.getPosts();
    return { posts: result.posts };
  };

  const { data, isLoading, error, isValidating } = useSWR<PostsData>(
    'articles/page',
    customFetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      posts: data?.posts || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.posts.length,
    }),
    [data?.posts, error, isLoading, isValidating]
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

  const { data, isLoading, error, isValidating } = useSWR<PostData>(
    id ? `articles/${id}` : null,
    id ? customFetcher : null,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      post: data?.post,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data?.post, error, isLoading, isValidating]
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
  const customFetcher = async () => {
    if (!query) return { results: [] };
    const result = await postService.getPosts({ title: query });
    return { results: result.posts };
  };

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(
    query ? `articles/search?query=${query}` : null,
    query ? customFetcher : null,
    {
      ...swrOptions,
      keepPreviousData: true,
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
    return { posts: result.posts };
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

import type { IPostItem } from 'src/types/blog';

import axiosInstance, { apiEndpoints } from './axios';

// 将后端Article转换为前端IPostItem
export function articleToPostItem(article: any, nodes: any[] = []): IPostItem {
  if (!article) return {} as IPostItem;

  return {
    id: article.id,
    title: article.title || '',
    tags: article.tags ? article.tags.split(',').filter(Boolean) : [],
    publish: article.isPublished === 1 ? 'published' : 'draft',
    content: article.content || '',
    coverUrl: article.coverImage || '/assets/images/cover/cover_1.jpg',
    metaTitle: article.title || '',
    totalViews: 0, // 后端暂无此数据
    totalShares: 0, // 后端暂无此数据
    description: article.content ? article.content.substring(0, 200) : '',
    totalComments: 0, // 后端暂无此数据
    createdAt: article.createTime || new Date().toISOString(),
    totalFavorites: 0, // 后端暂无此数据
    metaKeywords: article.tags ? article.tags.split(',').filter(Boolean) : [],
    metaDescription: article.content ? article.content.substring(0, 200) : '',
    comments: [], // 后端暂无评论功能
    author: {
      name: article.author || 'Admin',
      avatarUrl: '/assets/images/avatar/avatar_1.jpg',
    },
    favoritePerson: [], // 后端暂无此数据
    // 扩展字段，保存节点信息
    nodes: nodes || [],
  };
}

// 将前端IPostItem转换为后端Article
export function postItemToArticle(postItem: Partial<IPostItem>): any {
  return {
    id: postItem.id,
    title: postItem.title || '',
    content: postItem.content || '',
    coverImage: postItem.coverUrl || '',
    author: postItem.author?.name || 'Admin',
    category: postItem.tags?.[0] || '',
    tags: postItem.tags?.join(',') || '',
    isPublished: postItem.publish === 'published' ? 1 : 0,
  };
}

// API服务，封装对后端的调用
export const postService = {
  // 获取文章列表
  async getPosts(params: any = {}) {
    try {
      const response = await axiosInstance.get(apiEndpoints.article.list, { params });
      const { records = [], total = 0 } = response.data.data || {};

      return {
        posts: records.map((article: any) => articleToPostItem(article)),
        total,
      };
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return { posts: [], total: 0 };
    }
  },

  // 获取文章详情
  async getPostById(id: string | number) {
    try {
      const [articleRes, nodesRes] = await Promise.all([
        axiosInstance.get(apiEndpoints.article.details(id)),
        axiosInstance.get(apiEndpoints.article.nodes(id)),
      ]);

      const article = articleRes.data.data;
      const nodes = nodesRes.data.data || [];

      return articleToPostItem(article, nodes);
    } catch (error) {
      console.error(`Failed to fetch post with id ${id}:`, error);
      throw error;
    }
  },

  // 创建文章
  async createPost(postData: Partial<IPostItem>) {
    try {
      const article = postItemToArticle(postData);
      const response = await axiosInstance.post(apiEndpoints.article.create, article);
      return response.data;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  },

  // 更新文章
  async updatePost(id: string | number, postData: Partial<IPostItem>) {
    try {
      const article = postItemToArticle({ ...postData, id: String(id) });
      const response = await axiosInstance.put(apiEndpoints.article.update(id), article);
      return response.data;
    } catch (error) {
      console.error(`Failed to update post with id ${id}:`, error);
      throw error;
    }
  },

  // 删除文章
  async deletePost(id: string | number) {
    try {
      const response = await axiosInstance.delete(apiEndpoints.article.delete(id));
      return response.data;
    } catch (error) {
      console.error(`Failed to delete post with id ${id}:`, error);
      throw error;
    }
  },

  // 获取未归档的文章
  async getUnarchivedPosts(params: any = {}) {
    try {
      const response = await axiosInstance.get(apiEndpoints.article.unarchived, { params });
      const { records = [], total = 0 } = response.data.data || {};

      return {
        posts: records.map((article: any) => articleToPostItem(article)),
        total,
      };
    } catch (error) {
      console.error('Failed to fetch unarchived posts:', error);
      return { posts: [], total: 0 };
    }
  },

  // 将文章添加到目录
  async addArticleToDirectory(articleId: string | number, directoryId: string | number) {
    try {
      const response = await axiosInstance.post(apiEndpoints.article.addToDirectory(articleId), {
        nodeId: directoryId,
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to add article ${articleId} to directory ${directoryId}:`, error);
      throw error;
    }
  },
};

// 节点(目录)服务
export const nodeService = {
  // 获取节点树
  async getNodeTree() {
    try {
      const response = await axiosInstance.get(apiEndpoints.node.tree);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch node tree:', error);
      return [];
    }
  },

  // 创建目录节点
  async createDirectory(name: string, parentId?: string | number) {
    try {
      const response = await axiosInstance.post(apiEndpoints.node.create, {
        name,
        parentId: parentId || null,
        type: 0, // 假设0表示目录类型
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create directory:', error);
      throw error;
    }
  },

  // 删除节点
  async deleteNode(id: string | number) {
    try {
      const response = await axiosInstance.delete(apiEndpoints.node.delete(id));
      return response.data;
    } catch (error) {
      console.error(`Failed to delete node with id ${id}:`, error);
      throw error;
    }
  },

  // 更新节点
  async updateNode(id: string | number, data: any) {
    try {
      const response = await axiosInstance.put(apiEndpoints.node.update(id), data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update node with id ${id}:`, error);
      throw error;
    }
  },

  // 移动节点
  async moveNode(nodeId: string | number, newParentId: string | number) {
    try {
      const response = await axiosInstance.put(apiEndpoints.node.move(nodeId, newParentId));
      return response.data;
    } catch (error) {
      console.error(`Failed to move node ${nodeId} to parent ${newParentId}:`, error);
      throw error;
    }
  },
};

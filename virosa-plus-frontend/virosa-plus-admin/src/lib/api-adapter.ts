import type { IPostItem, INodeItem } from 'src/types/blog';

import axiosInstance, { apiEndpoints } from './axios';

// 将后端Article转换为前端IPostItem
export function articleToPostItem(article: any, nodes: any[] = []): IPostItem {
  if (!article) return {} as IPostItem;

  // 调试数据结构
  console.log('后端返回的原始文章数据:', article);

  // 确定发布状态 - 尝试多种可能的字段名
  let publishStatus = 'draft'; // 默认为草稿

  if (Object.prototype.hasOwnProperty.call(article, 'isPublished')) {
    publishStatus = article.isPublished === 1 || article.isPublished === true ? 'published' : 'draft';
  } else if (Object.prototype.hasOwnProperty.call(article, 'publish')) {
    publishStatus = article.publish === 'published' || article.publish === 1 || article.publish === true
      ? 'published'
      : 'draft';
  } else if (Object.prototype.hasOwnProperty.call(article, 'status')) {
    publishStatus = article.status === 1 || article.status === true || article.status === 'published'
      ? 'published'
      : 'draft';
  }

  // 获取标签信息
  let tags: string[] = [];
  if (article.tags && typeof article.tags === 'string') {
    tags = article.tags.split(',').filter(Boolean);
  } else if (article.type) {
    tags = [article.type];
  }

  // 构建格式化的文章对象
  const formattedPost: IPostItem = {
    id: article.id?.toString() || '',
    title: article.title || '',
    tags,
    publish: publishStatus,
    content: article.content || '',
    coverUrl: article.cover || '/assets/images/cover/cover_1.jpg',
    metaTitle: article.title || '',
    totalViews: 0, // 始终设置为0，因为文章没有设计浏览量
    totalShares: 0,
    description: article.content ? article.content.substring(0, 200) : '',
    totalComments: 0,
    createdAt: article.createTime || new Date().toISOString(),
    totalFavorites: 0,
    metaKeywords: tags,
    metaDescription: article.content ? article.content.substring(0, 200) : '',
    comments: [],
    author: {
      name: article.author || 'Admin',
      avatarUrl: '/assets/images/avatar/avatar_1.jpg',
    },
    favoritePerson: [],
    // 扩展字段，保存节点信息
    nodes: nodes || [],
  };

  console.log('转换后的文章数据:', {
    id: formattedPost.id,
    title: formattedPost.title,
    publish: formattedPost.publish,
    tags: formattedPost.tags
  });

  return formattedPost;
}

// 将前端IPostItem转换为后端Article
export function postItemToArticle(postItem: Partial<IPostItem>): any {
  const articleData = {
    id: postItem.id,
    title: postItem.title || '',
    content: postItem.content || '',
    cover: postItem.coverUrl || '',
    author: postItem.author?.name || 'Admin',
    type: postItem.tags?.[0] || '',
    isPublished: postItem.publish === 'published' ? 1 : 0,
  };

  console.log('将文章数据转换为后端格式:', articleData);
  return articleData;
}

// API服务，封装对后端的调用
export const postService = {
  // 获取文章列表
  async getPosts(params: any = {}) {
    try {
      console.log('发送请求获取文章列表，参数:', params);

      // 预处理参数
      const apiParams = { ...params };

      // 如果存在publish参数，转换为后端需要的格式
      if (apiParams.publish && apiParams.publish !== 'all') {
        apiParams.isPublished = apiParams.publish === 'published' ? 1 : 0;
        delete apiParams.publish; // 删除前端特有参数
      }

      // 发送请求
      const response = await axiosInstance.get(apiEndpoints.article.list, { params: apiParams });
      console.log('文章列表API响应:', response.data);

      // 安全地提取数据
      const responseData = response.data || {};
      const dataObject = responseData.data || {};

      // 尝试提取文章列表 - 适配多种可能的字段名
      let articleList = [];
      let totalCount = 0;

      if (Array.isArray(dataObject)) {
        // 如果直接返回数组
        articleList = dataObject;
        totalCount = dataObject.length;
      } else if (dataObject.list && Array.isArray(dataObject.list)) {
        // 如果返回 {list: [...], total: n}
        articleList = dataObject.list;
        totalCount = dataObject.total || dataObject.list.length;
      } else if (dataObject.records && Array.isArray(dataObject.records)) {
        // 如果返回 {records: [...], total: n}
        articleList = dataObject.records;
        totalCount = dataObject.total || dataObject.records.length;
      } else if (dataObject.content && Array.isArray(dataObject.content)) {
        // Spring Data 分页格式
        articleList = dataObject.content;
        totalCount = dataObject.totalElements || dataObject.content.length;
      }

      console.log(`成功获取 ${articleList.length} 篇文章，总数: ${totalCount}`);

      // 转换为前端格式
      const posts = articleList.map((article: any) => articleToPostItem(article));

      return {
        posts,
        total: totalCount,
      };
    } catch (error) {
      console.error('获取文章列表失败:', error);
      return { posts: [], total: 0 };
    }
  },

  // 获取文章详情
  async getPostById(id: string | number) {
    try {
      console.log(`获取文章详情, ID: ${id}`);

      const [articleRes, nodesRes] = await Promise.all([
        axiosInstance.get(apiEndpoints.article.details(id)),
        axiosInstance.get(apiEndpoints.article.nodes(id)),
      ]);

      console.log('文章详情响应:', articleRes.data);
      console.log('文章节点响应:', nodesRes.data);

      const article = articleRes.data.data;
      const nodes = nodesRes.data.data || [];

      return articleToPostItem(article, nodes);
    } catch (error) {
      console.error(`获取文章详情失败, ID: ${id}`, error);
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
      console.log(`正在更新文章 ID: ${id}`, postData);

      // 转换前端数据到后端格式
      const article = postItemToArticle({ ...postData, id: String(id) });
      console.log('转换后的后端数据格式:', article);

      // 发送请求
      const response = await axiosInstance.put(apiEndpoints.article.update(id), article);
      console.log('文章更新响应:', response.data);

      if (response.data.code !== 200) {
        throw new Error(response.data.msg || '更新文章失败');
      }

      return response.data;
    } catch (error) {
      console.error(`更新文章失败, ID: ${id}`, error);
      throw error;
    }
  },

  // 专门用于更新文章发布状态的方法
  async updatePostPublishStatus(id: string | number, isPublished: boolean) {
    try {
      console.log(`更新文章发布状态, ID: ${id}, 发布状态: ${isPublished ? '已发布' : '草稿'}`);

      // 先获取文章详情，确保我们有完整数据
      const article = await this.getPostById(id);
      console.log('获取到的原文章数据:', article);

      // 修改发布状态
      const updateData = {
        id: Number(id),
        title: article.title || '',
        content: article.content || '',
        author: article.author?.name || 'Admin',
        isPublished: isPublished ? 1 : 0
      };

      console.log('发送更新状态请求:', updateData);
      const response = await axiosInstance.put(apiEndpoints.article.update(id), updateData);

      console.log('更新发布状态响应:', response.data);

      // 检查响应是否成功 - 兼容不同的成功状态码格式
      const isSuccess =
        response.data.code === 200 ||
        response.data.code === 0 ||
        response.data.code === '0' ||
        response.data.code === '200';

      if (isSuccess) {
        console.log('成功更新文章发布状态');
        return response.data;
      }

      // 如果不是成功状态码，抛出错误
      throw new Error(response.data.msg || '更新状态失败');
    } catch (error) {
      console.error(`更新文章发布状态失败, ID: ${id}`, error);
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
      // 适配后端返回的数据结构
      const { list = [], total = 0 } = response.data.data || {};

      return {
        posts: list.map((article: any) => articleToPostItem(article)),
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

  // 获取文章关联的目录
  async getArticleDirectories(articleId: string | number) {
    try {
      const response = await axiosInstance.get(apiEndpoints.article.nodes(articleId));
      return response.data.data || [];
    } catch (error) {
      console.error(`Failed to fetch directories for article ${articleId}:`, error);
      return [];
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

  // 移除文章与目录的关联
  async removeArticleFromDirectory(nodeId: string | number) {
    try {
      const response = await axiosInstance.delete(apiEndpoints.node.removeArticle(nodeId));
      return response.data;
    } catch (error) {
      console.error(`Failed to remove article from node ${nodeId}:`, error);
      throw error;
    }
  },
};

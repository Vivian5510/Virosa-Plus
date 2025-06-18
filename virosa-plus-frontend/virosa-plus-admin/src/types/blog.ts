import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IPostFilters = {
  publish: string;
};

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: IDateValue;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export type IPostComment = {
  id: string;
  name: string;
  message: string;
  avatarUrl: string;
  postedAt: IDateValue;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    tagUser?: string;
    postedAt: IDateValue;
  }[];
};

// 节点类型定义
export type INodeItem = {
  id: string | number;
  title?: string;
  name?: string;
  content?: string;
  parentId?: string | number | null;
  articleId?: string | number | null;
  orderNum?: number;
  children?: INodeItem[];
  createTime?: string;
  updateTime?: string;
  status?: number;
  type?: number;
};

export type IPostItem = {
  id: string;
  title: string;
  tags: string[];
  publish: string;
  content: string;
  coverUrl: string;
  metaTitle: string;
  totalViews: number;
  totalShares: number;
  description: string;
  totalComments: number;
  createdAt: IDateValue;
  totalFavorites: number;
  metaKeywords: string[];
  metaDescription: string;
  comments: IPostComment[];
  author: {
    name: string;
    avatarUrl: string;
  };
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  // 扩展属性：文章所在的节点
  nodes?: INodeItem[];
};

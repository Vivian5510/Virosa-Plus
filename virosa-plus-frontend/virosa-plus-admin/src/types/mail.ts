import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IMailLabel = {
  id: string;
  type: string;
  name: string;
  color: string;
  unreadCount?: number;
};

export type IMailSender = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type IMailAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: IDateValue;
  modifiedAt: IDateValue;
};

export type IMail = {
  id: string;
  folder: string;
  subject: string;
  message: string;
  isUnread: boolean;
  from: IMailSender;
  to: IMailSender[];
  labelIds: string[];
  isStarred: boolean;
  isImportant: boolean;
  createdAt: IDateValue;
  attachments: IMailAttachment[];
};

export type IMails = {
  allIds: string[];
  byId: Record<string, IMail>;
};

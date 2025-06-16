import type { UniqueIdentifier } from '@dnd-kit/core';

import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IKanbanComment = {
  id: string;
  name: string;
  message: string;
  avatarUrl: string;
  createdAt: IDateValue;
  messageType: 'image' | 'text';
};

export type IKanbanAssignee = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: IDateValue;
};

export type IKanbanTask = {
  name: string;
  status: string;
  priority: string;
  labels: string[];
  id: UniqueIdentifier;
  description?: string;
  attachments: string[];
  comments: IKanbanComment[];
  assignee: IKanbanAssignee[];
  due: [IDateValue, IDateValue];
  reporter: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

export type IKanbanColumn = {
  name: string;
  id: UniqueIdentifier;
};

export type IKanban = {
  columns: IKanbanColumn[];
  tasks: Record<UniqueIdentifier, IKanbanTask[]>;
};

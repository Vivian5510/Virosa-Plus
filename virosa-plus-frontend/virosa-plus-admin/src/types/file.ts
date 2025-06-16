import type { IDateValue, IDatePickerControl } from './common';

// ----------------------------------------------------------------------

export type IFileFilters = {
  name: string;
  type: string[];
  endDate: IDatePickerControl;
  startDate: IDatePickerControl;
};

export type IFileShared = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  permission: string;
};

export type IFolderManager = {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  tags: string[];
  totalFiles?: number;
  isFavorited: boolean;
  createdAt: IDateValue;
  modifiedAt: IDateValue;
  shared: IFileShared[] | null;
};

export type IFileManager = {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  tags: string[];
  isFavorited: boolean;
  createdAt: IDateValue;
  modifiedAt: IDateValue;
  shared: IFileShared[] | null;
};

export type IFile = IFileManager | IFolderManager;

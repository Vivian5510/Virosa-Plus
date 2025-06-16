import type { TreeProps } from 'react-organizational-chart';

// ----------------------------------------------------------------------

export type OrgChartProps<T> = Omit<TreeProps, 'label' | 'children'> & {
  data: {
    name: string;
    children: T[];
  };
  nodeItem: (props: T) => React.ReactElement;
};

export type OrgChartListProps<T> = {
  data: T;
  depth: number;
  nodeItem: (props: T) => React.ReactElement;
};

export type OrgChartSubListProps<T> = {
  data: T[];
  depth: number;
  nodeItem: (props: T) => React.ReactElement;
};

export type OrgChartBaseNode = {
  depth?: number;
  totalChildren?: number;
};

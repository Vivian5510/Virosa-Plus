import { cloneElement } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

import { useTheme } from '@mui/material/styles';

import type { OrgChartProps, OrgChartListProps, OrgChartSubListProps } from './types';

// ----------------------------------------------------------------------

export function OrganizationalChart<T>({ data, nodeItem, ...other }: OrgChartProps<T>) {
  const theme = useTheme();

  const cloneNode = (props: T) => cloneElement(nodeItem(props));

  const label = cloneNode({ ...data } as T);

  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={theme.vars.palette.divider}
      label={label}
      {...other}
    >
      {data.children.map((list, index) => (
        <TreeList key={index} depth={1} data={list} nodeItem={nodeItem} />
      ))}
    </Tree>
  );
}

// ----------------------------------------------------------------------

function TreeList<T>({ data, depth, nodeItem }: OrgChartListProps<T>) {
  const childs = (data as any).children;

  const cloneNode = (props: T) => cloneElement(nodeItem(props));

  const totalChildren = childs ? flattenArray(childs)?.length : 0;

  const label = cloneNode({ ...data, depth, totalChildren } as T);

  return (
    <TreeNode label={label}>
      {childs && <TreeSubList data={childs} depth={depth} nodeItem={nodeItem} />}
    </TreeNode>
  );
}

// ----------------------------------------------------------------------

function TreeSubList<T>({ data, depth, nodeItem }: OrgChartSubListProps<T>) {
  return (
    <>
      {data.map((list, index) => (
        <TreeList key={index} data={list} depth={depth + 1} nodeItem={nodeItem} />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

function flattenArray<T extends Record<string, any>>(list: T[], key: string = 'children'): T[] {
  let children: T[] = [];

  const flatten = list.map((item: T) => {
    if (Array.isArray(item[key]) && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten.concat(children.length ? flattenArray(children, key) : []);
}

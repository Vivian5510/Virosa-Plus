import { OrganizationalChart } from 'src/components/organizational-chart';

import { GroupNode } from './group-node';
import { SimpleNode } from './simple-node';
import { StandardNode } from './standard-node';
import { GROUP_DATA, SIMPLE_DATA } from './data';
import { ComponentBox, ComponentLayout } from '../../layout';

import type { NodeProps } from './data';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Simple',
    component: (
      <ComponentBox sx={{ overflowY: 'auto', minHeight: 640 }}>
        <OrganizationalChart
          data={SIMPLE_DATA}
          lineColor="var(--palette-primary-light)"
          nodeItem={(props: NodeProps) => <SimpleNode sx={{}} {...props} />}
          /* Or
           * nodeItem={SimpleNode}
           */
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Standard',
    component: (
      <ComponentBox sx={{ overflowY: 'auto', minHeight: 640 }}>
        <OrganizationalChart
          lineHeight="40px"
          data={SIMPLE_DATA}
          nodeItem={(props: NodeProps) => <StandardNode sx={{}} {...props} />}
          /* Or
           * nodeItem={StandardNode}
           */
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Group',
    component: (
      <ComponentBox sx={{ overflowY: 'auto', minHeight: 640 }}>
        <OrganizationalChart
          lineHeight="64px"
          data={GROUP_DATA}
          nodeItem={(props: NodeProps) => <GroupNode sx={{}} {...props} />}
          /* Or
           * nodeItem={GroupNode}
           */
        />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function OrganizationalChartView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Organizational chart',
        moreLinks: [
          'https://www.npmjs.com/package/react-organizational-chart',
          'https://daniel-hauser.github.io/react-organizational-chart/?path=/story/example-tree--basic',
        ],
      }}
      containerProps={{ maxWidth: 'lg' }}
    />
  );
}

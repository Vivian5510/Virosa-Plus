import { CustomIcons } from './custom-icon';
import { CustomStyling } from './custom-styling';
import { BasicRichTree, BasicSimpleTree } from './basic';
import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Simple tree view',
    component: (
      <ComponentBox>
        <BasicSimpleTree />
      </ComponentBox>
    ),
  },
  {
    name: 'Rich tree view',
    component: (
      <ComponentBox>
        <BasicRichTree />
      </ComponentBox>
    ),
  },
  {
    name: 'Custom styling',
    component: (
      <ComponentBox>
        <CustomStyling />
      </ComponentBox>
    ),
  },
  {
    name: 'Custom icon',
    component: (
      <ComponentBox>
        <CustomIcons />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function TreeView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'MUI X Tree View',
        moreLinks: ['https://mui.com/x/react-tree-view/'],
      }}
    />
  );
}

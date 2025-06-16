import { SimpleTransferList } from './simple-transfer-list';
import { ComponentBox, ComponentLayout } from '../../layout';
import { EnhancedTransferList } from './enhanced-transfer-list';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  {
    name: 'Simple',
    component: (
      <ComponentBox>
        <SimpleTransferList />
      </ComponentBox>
    ),
  },
  {
    name: 'Enhanced',
    component: (
      <ComponentBox>
        <EnhancedTransferList />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function TransferListView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Transfer List',
        moreLinks: ['https://mui.com/material-ui/react-transfer-list/'],
      }}
    />
  );
}

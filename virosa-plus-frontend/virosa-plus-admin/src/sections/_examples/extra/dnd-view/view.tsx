import { itemClasses } from './classes';
import { ComponentLayout } from '../../layout';
import { SortableContainer } from './sortable-container';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  { name: 'Grid', component: <SortableContainer swap /> },
  { name: 'Vertical', component: <SortableContainer layout="vertical" itemCount={4} /> },
  {
    name: 'Horizontal',
    component: (
      <SortableContainer
        layout="horizontal"
        itemCount={3}
        sx={{ [`& .${itemClasses.item}`]: { px: 8 } }}
      />
    ),
  },
];

// ----------------------------------------------------------------------

export function DndView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Dnd',
        moreLinks: ['https://docs.dndkit.com/'],
      }}
    />
  );
}

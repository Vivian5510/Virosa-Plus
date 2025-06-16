import { NavAPI } from './nav-api';
import { NavMini } from './nav-mini';
import { NavBasic } from './nav-basic';
import { NavVertical } from './nav-vertical';
import { ComponentLayout } from '../../layout';
import { NavHorizontal } from './nav-horizontal';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  { name: 'Basic', component: <NavBasic /> },
  { name: 'Vertical', component: <NavVertical /> },
  { name: 'Mini', component: <NavMini /> },
  { name: 'Horizontal', component: <NavHorizontal /> },
  { name: 'Data from API', component: <NavAPI /> },
];

// ----------------------------------------------------------------------

export function NavigationBarView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Navigation bar',
      }}
    />
  );
}

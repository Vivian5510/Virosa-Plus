import { DemoMegaMenuMobile } from './mobile';
import { ComponentLayout } from '../../layout';
import { DemoMegaMenuVertical } from './vertical';
import { DemoMegaMenuHorizontal } from './horizontal';

// ----------------------------------------------------------------------

export function MegaMenuView() {
  return (
    <ComponentLayout
      heroProps={{
        heading: 'Mega menu',
        bottomNode: <DemoMegaMenuHorizontal />,
      }}
      containerProps={{ maxWidth: 'lg' }}
    >
      <DemoMegaMenuMobile />
      <DemoMegaMenuVertical />
    </ComponentLayout>
  );
}

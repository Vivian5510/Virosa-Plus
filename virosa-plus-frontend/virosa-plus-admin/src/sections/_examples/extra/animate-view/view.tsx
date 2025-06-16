import { useTabs } from 'minimal-shared/hooks';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { AnimateOther } from './other';
import { AnimateScroll } from './scroll';
import { AnimateDialog } from './dialog';
import { AnimateInview } from './inview';
import { ComponentLayout } from '../../layout';
import { AnimateBackground } from './background';
import { scrollOptions, inviewOptions, backgroundOptions } from './variant-keys';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'inview', label: 'In View', component: <AnimateInview options={inviewOptions} /> },
  { value: 'scroll', label: 'Scroll', component: <AnimateScroll options={scrollOptions} /> },
  { value: 'dialog', label: 'Dialog', component: <AnimateDialog options={scrollOptions} /> },
  {
    value: 'background',
    label: 'Background',
    component: <AnimateBackground options={backgroundOptions} />,
  },
  { value: 'other', label: 'Other', component: <AnimateOther /> },
];

// ----------------------------------------------------------------------

export function AnimateView() {
  const tabs = useTabs('inview');

  return (
    <ComponentLayout
      heroProps={{
        heading: 'Animate',
        moreLinks: ['https://www.framer.com/motion'],
      }}
      containerProps={{
        maxWidth: 'lg',
      }}
    >
      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: 5 }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {TABS.map((tab) => tab.value === tabs.value && <Box key={tab.value}>{tab.component}</Box>)}
    </ComponentLayout>
  );
}

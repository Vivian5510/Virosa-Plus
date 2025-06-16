import { Fragment } from 'react';
import { useTabs } from 'minimal-shared/hooks';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'one', icon: <Iconify width={24} icon="solar:phone-bold" />, label: 'Item one' },
  { value: 'two', icon: <Iconify width={24} icon="solar:heart-bold" />, label: 'Item two' },
  {
    value: 'three',
    icon: <Iconify width={24} icon="eva:headphones-fill" />,
    label: 'Item three',
    disabled: true,
  },
  { value: 'four', icon: <Iconify width={24} icon="eva:headphones-fill" />, label: 'Item four' },
  {
    value: 'five',
    icon: <Iconify width={24} icon="eva:headphones-fill" />,
    label: 'Item five',
    disabled: true,
  },
  { value: 'six', icon: <Iconify width={24} icon="eva:headphones-fill" />, label: 'Item six' },
  { value: 'seven', icon: <Iconify width={24} icon="eva:headphones-fill" />, label: 'Item seven' },
];

// ----------------------------------------------------------------------

export function TabsView() {
  const basicTabs = useTabs('one');
  const customTabs = useTabs('one');
  const scrollableTabs = useTabs('one');

  const DEMO_COMPONENTS = [
    {
      name: 'Text',
      component: (
        <ComponentBox sx={{ flexDirection: 'column', alignItems: 'unset' }}>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Paper variant="outlined" sx={{ p: 2.5, typography: 'body2', borderRadius: 1.5 }}>
            {TABS.slice(0, 3).map((tab) =>
              tab.value === basicTabs.value ? (
                <Fragment key={tab.value}>{tab.label}</Fragment>
              ) : null
            )}
          </Paper>
        </ComponentBox>
      ),
    },
    {
      name: 'Icon',
      component: (
        <ComponentBox>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab key={tab.value} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'Top',
      component: (
        <ComponentBox>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab
                iconPosition="top"
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'Bottom',
      component: (
        <ComponentBox>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab
                iconPosition="bottom"
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'Start',
      component: (
        <ComponentBox>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'End',
      component: (
        <ComponentBox>
          <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
            {TABS.slice(0, 3).map((tab) => (
              <Tab
                iconPosition="end"
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'Scrollable',
      component: (
        <ComponentBox>
          <Tabs
            value={scrollableTabs.value}
            onChange={scrollableTabs.onChange}
            sx={{ maxWidth: 320 }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </ComponentBox>
      ),
    },
    {
      name: 'Custom',
      component: (
        <>
          <ComponentBox title="Dynamic width" sx={{ flexDirection: 'column' }}>
            <CustomTabs
              value={customTabs.value}
              onChange={customTabs.onChange}
              sx={{ borderRadius: 1 }}
            >
              {TABS.slice(0, 4).map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </CustomTabs>
          </ComponentBox>

          <ComponentBox title="Scrollable width" sx={{ my: 5, flexDirection: 'column' }}>
            <CustomTabs
              value={customTabs.value}
              onChange={customTabs.onChange}
              variant="scrollable"
              sx={{ maxWidth: 320, borderRadius: 1 }}
            >
              {TABS.slice(0, 4).map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </CustomTabs>
          </ComponentBox>

          <ComponentBox title="Full width" sx={{ flexDirection: 'column' }}>
            <CustomTabs
              value={customTabs.value}
              onChange={customTabs.onChange}
              variant="fullWidth"
              sx={{ width: 1, borderRadius: 1 }}
            >
              {TABS.slice(0, 4).map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </CustomTabs>

            <Paper
              variant="outlined"
              sx={{ p: 2.5, width: 1, borderRadius: 1.5, typography: 'body2' }}
            >
              {TABS.map((tab) =>
                tab.value === customTabs.value ? (
                  <Fragment key={tab.value}>{tab.label}</Fragment>
                ) : null
              )}
            </Paper>
          </ComponentBox>
        </>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Tabs',
        moreLinks: ['https://mui.com/material-ui/react-tabs/'],
      }}
    />
  );
}

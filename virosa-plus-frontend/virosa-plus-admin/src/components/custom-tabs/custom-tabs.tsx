import type { TabsProps } from '@mui/material/Tabs';
import type { Theme, SxProps } from '@mui/material/styles';

import { tabClasses } from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

// ----------------------------------------------------------------------

export type CustomTabsProps = TabsProps & {
  slotProps?: TabsProps['slotProps'] & {
    scroller?: SxProps<Theme>;
    indicator?: SxProps<Theme>;
    tab?: SxProps<Theme>;
    selected?: SxProps<Theme>;
    scrollButtons?: SxProps<Theme>;
    flexContainer?: SxProps<Theme>;
  };
};

export function CustomTabs({ children, slotProps, sx, ...other }: CustomTabsProps) {
  return (
    <Tabs
      sx={[
        (theme) => ({
          gap: { sm: 0 },
          minHeight: 38,
          flexShrink: 0,
          alignItems: 'center',
          bgcolor: 'background.neutral',
          [`& .${tabsClasses.scroller}`]: { p: 1, ...slotProps?.scroller },
          [`& .${tabsClasses.flexContainer}`]: { gap: 0, ...slotProps?.flexContainer },
          [`& .${tabsClasses.scrollButtons}`]: {
            borderRadius: 1,
            minHeight: 'inherit',
            ...slotProps?.scrollButtons,
          },
          [`& .${tabsClasses.indicator}`]: {
            py: 1,
            height: 1,
            bgcolor: 'transparent',
            '& > span': {
              width: 1,
              height: 1,
              borderRadius: 1,
              display: 'block',
              bgcolor: 'common.white',
              boxShadow: theme.vars.customShadows.z1,
              ...theme.applyStyles('dark', {
                bgcolor: 'grey.900',
              }),
              ...slotProps?.indicator,
            },
          },
          [`& .${tabClasses.root}`]: {
            py: 1,
            px: 2,
            zIndex: 1,
            minHeight: 'auto',
            ...slotProps?.tab,
            [`&.${tabClasses.selected}`]: { ...slotProps?.selected },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
      TabIndicatorProps={{
        children: <span />,
      }}
    >
      {children}
    </Tabs>
  );
}

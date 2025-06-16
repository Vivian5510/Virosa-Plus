import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Managing your account',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-account.svg`,
    href: '#',
  },
  { label: 'Payment', icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-payment.svg`, href: '#' },
  { label: 'Delivery', icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-delivery.svg`, href: '#' },
  {
    label: 'Problem with the product',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-package.svg`,
    href: '#',
  },
  {
    label: 'Return & refund',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-refund.svg`,
    href: '#',
  },
  {
    label: 'Guarantees and assurances',
    icon: `${CONFIG.assetsDir}/assets/icons/faqs/ic-assurances.svg`,
    href: '#',
  },
];

// ----------------------------------------------------------------------

export function FaqsCategory() {
  const navOpen = useBoolean();

  const renderMobile = () => (
    <>
      <Box
        sx={[
          (theme) => ({
            p: 2,
            top: 0,
            left: 0,
            width: 1,
            position: 'absolute',
            display: { xs: 'block', md: 'none' },
            borderBottom: `solid 1px ${theme.vars.palette.divider}`,
          }),
        ]}
      >
        <Button startIcon={<Iconify icon="solar:list-bold" />} onClick={navOpen.onTrue}>
          Categories
        </Button>
      </Box>

      <Drawer open={navOpen.value} onClose={navOpen.onFalse}>
        <Box
          sx={{
            p: 1,
            gap: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {CATEGORIES.map((category) => (
            <ItemMobile key={category.label} category={category} />
          ))}
        </Box>
      </Drawer>
    </>
  );

  const renderDesktop = () => (
    <Box
      sx={{
        gap: 3,
        display: { xs: 'none', md: 'grid' },
        gridTemplateColumns: { md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' },
      }}
    >
      {CATEGORIES.map((category) => (
        <ItemDesktop key={category.label} category={category} />
      ))}
    </Box>
  );

  return (
    <>
      {renderMobile()}
      {renderDesktop()}
    </>
  );
}

// ----------------------------------------------------------------------

type ItemProps = {
  category: (typeof CATEGORIES)[number];
};

function ItemDesktop({ category }: ItemProps) {
  return (
    <Paper
      variant="outlined"
      sx={[
        (theme) => ({
          p: 3,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          textAlign: 'center',
          '&:hover': { bgcolor: 'background.paper', boxShadow: theme.vars.customShadows.z20 },
        }),
      ]}
    >
      <Avatar
        alt={category.icon}
        src={category.icon}
        sx={{
          mb: 2,
          width: 80,
          height: 80,
          mx: 'auto',
        }}
      />

      <Typography
        variant="subtitle2"
        sx={(theme) => ({
          ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
        })}
      >
        {category.label}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function ItemMobile({ category }: ItemProps) {
  return (
    <ListItemButton
      key={category.label}
      sx={{
        py: 2,
        maxWidth: 140,
        borderRadius: 1,
        textAlign: 'center',
        alignItems: 'center',
        typography: 'subtitle2',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'background.neutral',
      }}
    >
      <Avatar alt={category.icon} src={category.icon} sx={{ width: 48, height: 48, mb: 1 }} />

      {category.label}
    </ListItemButton>
  );
}

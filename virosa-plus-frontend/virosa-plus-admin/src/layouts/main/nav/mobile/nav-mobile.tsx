import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { Nav, NavUl } from '../components';
import { NavList } from './nav-mobile-list';
import { SignInButton } from '../../../components/sign-in-button';

import type { NavMainProps } from '../types';

// ----------------------------------------------------------------------

export type NavMobileProps = NavMainProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({ data, open, onClose, slots, sx }: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: [
          { display: 'flex', flexDirection: 'column', width: 'var(--layout-nav-mobile-width)' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ],
      }}
    >
      {slots?.topArea ?? (
        <Box
          sx={{
            display: 'flex',
            pt: 3,
            pb: 2,
            pl: 2.5,
          }}
        >
          <Logo />
        </Box>
      )}

      <Scrollbar fillContent>
        <Nav
          sx={{
            pb: 3,
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <NavUl>
            {data.map((list) => (
              <NavList key={list.title} data={list} />
            ))}
          </NavUl>
        </Nav>
      </Scrollbar>

      {slots?.bottomArea ?? (
        <Box
          sx={{
            py: 3,
            px: 2.5,
            gap: 1.5,
            display: 'flex',
          }}
        >
          <SignInButton fullWidth />

          <Button
            fullWidth
            variant="contained"
            rel="noopener"
            target="_blank"
            href={paths.minimalStore}
          >
            Purchase
          </Button>
        </Box>
      )}
    </Drawer>
  );
}

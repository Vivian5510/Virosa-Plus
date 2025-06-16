import { isEqualPath } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { megaMenuClasses } from '../styles';
import { NavUl, NavLi } from '../components/nav-elements';

import type { NavSubItemProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export function NavSubList({ data, slotProps, ...other }: NavSubListProps) {
  const pathname = usePathname();

  return (
    <>
      {data?.map((list) => (
        <NavLi key={list?.subheader ?? list.items[0].title} {...other}>
          {list?.subheader && (
            <Typography
              noWrap
              component="div"
              variant="subtitle2"
              className={megaMenuClasses.subheader}
              sx={{ mb: 1, ...slotProps?.subheader }}
            >
              {list.subheader}
            </Typography>
          )}

          <NavUl sx={{ gap: 0.75, alignItems: 'flex-start' }}>
            {list.items.map((item) => (
              <NavLi key={item.title} sx={{ width: 1, display: 'inline-flex' }}>
                <NavSubItem
                  component={RouterLink}
                  href={item.path}
                  active={isEqualPath(item.path, pathname)}
                  className={megaMenuClasses.item.sub}
                  sx={slotProps?.subItem}
                >
                  {item.title}
                </NavSubItem>
              </NavLi>
            ))}
          </NavUl>
        </NavLi>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

const NavSubItem = styled(Link, {
  shouldForwardProp: (prop: string) => !['active', 'sx'].includes(prop),
})<Partial<NavSubItemProps>>(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: theme.typography.pxToRem(13),
  color: theme.vars.palette.text.secondary,
  transition: theme.transitions.create(['color']),
  '&:hover': { color: theme.vars.palette.text.primary },
  variants: [
    {
      props: { active: true },
      style: {
        textDecoration: 'underline',
        color: theme.vars.palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold,
      },
    },
  ],
}));

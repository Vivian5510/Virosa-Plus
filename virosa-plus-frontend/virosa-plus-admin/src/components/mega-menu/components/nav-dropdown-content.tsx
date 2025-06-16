import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from '../../iconify';
import { NavSubList } from './nav-sub-list';
import { megaMenuClasses } from '../styles';
import { NavCarousel } from './nav-carousel';
import { NavUl } from '../components/nav-elements';

import type { NavListProps } from '../types';

// ----------------------------------------------------------------------

export function NavDropdownContent({
  data,
  slotProps,
  isMultiList,
}: NavListProps & { isMultiList: boolean }) {
  if (!data.children) {
    return null;
  }

  if (!isMultiList) {
    return (
      <NavUl>
        <NavSubList data={data.children} slotProps={slotProps} />
      </NavUl>
    );
  }

  return (
    <>
      <Masonry
        component="ul"
        columns={4}
        spacing={3}
        defaultColumns={4}
        defaultSpacing={3}
        className={megaMenuClasses.ul}
        {...slotProps?.masonry}
      >
        <NavSubList data={data.children} slotProps={slotProps} />
      </Masonry>

      {!!data.moreLink && (
        <Link
          component={RouterLink}
          href={data.moreLink.path}
          color="inherit"
          sx={{
            alignItems: 'center',
            typography: 'caption',
            display: 'inline-flex',
            fontWeight: 'fontWeightSemiBold',
            ...slotProps?.moreLink,
          }}
        >
          {data.moreLink.title} <Iconify width={16} icon="eva:arrow-ios-forward-fill" />
        </Link>
      )}

      {!!data.slides && (
        <>
          <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
          <NavCarousel
            slides={data.slides}
            options={slotProps?.carousel?.options}
            sx={slotProps?.carousel?.sx}
          />
        </>
      )}

      {!!data.tags && (
        <>
          <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
          <Box sx={slotProps?.tags}>
            <Typography variant="caption" sx={{ mr: 0.5, fontWeight: 'fontWeightBold' }}>
              Hot products:
            </Typography>

            {data.tags.map((tag, index) => (
              <Link
                key={tag.title}
                component={RouterLink}
                href={tag.path}
                variant="caption"
                sx={[
                  (theme) => ({
                    color: 'text.secondary',
                    transition: theme.transitions.create(['color']),
                    '&:hover': { color: 'text.primary' },
                  }),
                ]}
              >
                {index === 0 ? tag.title : `, ${tag.title} `}
              </Link>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

import type { ListItemButtonProps } from '@mui/material/ListItemButton';

import { varAlpha, isExternalLink } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = Omit<ListItemButtonProps, 'title'> & {
  href: string;
  labels: string[];
  title: { text: string; highlight: boolean }[];
  path: { text: string; highlight: boolean }[];
};

export function ResultItem({ title, path, labels, href, sx, ...other }: Props) {
  const linkProps = isExternalLink(href)
    ? { target: '_blank', rel: 'noopener noreferrer', href, component: 'a' }
    : { component: RouterLink, href };

  return (
    <ListItemButton
      {...linkProps}
      disableRipple
      sx={[
        (theme) => ({
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: 'transparent',
          borderBottomColor: theme.vars.palette.divider,
          '&:hover': {
            borderRadius: 1,
            borderColor: theme.vars.palette.primary.main,
            backgroundColor: varAlpha(
              theme.vars.palette.primary.mainChannel,
              theme.vars.palette.action.hoverOpacity
            ),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <ListItemText
        primary={title.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: part.highlight ? 'primary.main' : 'text.primary' }}
          >
            {part.text}
          </Box>
        ))}
        secondary={path.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: part.highlight ? 'primary.main' : 'text.secondary' }}
          >
            {part.text}
          </Box>
        ))}
        slotProps={{
          secondary: {
            noWrap: true,
            sx: { typography: 'caption' },
          },
        }}
      />

      <Box sx={{ gap: 0.75, display: 'flex' }}>
        {[...labels].reverse().map((label) => (
          <Label key={label} color="default">
            {label}
          </Label>
        ))}
      </Box>
    </ListItemButton>
  );
}

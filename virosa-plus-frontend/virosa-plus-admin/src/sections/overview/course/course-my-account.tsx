import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { AnimateBorder } from 'src/components/animate';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function CourseMyAccount({ sx, ...other }: CardProps) {
  const { user } = useMockedUser();

  const renderAvatar = () => (
    <AnimateBorder
      sx={{ mb: 2, p: '6px', width: 96, height: 96, borderRadius: '50%' }}
      slotProps={{
        primaryBorder: { size: 120, sx: { color: 'primary.main' } },
      }}
    >
      <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 1, height: 1 }}>
        {user?.displayName?.charAt(0).toUpperCase()}
      </Avatar>
    </AnimateBorder>
  );

  return (
    <Card sx={sx} {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {renderAvatar()}

        <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
          {user?.displayName}
        </Typography>

        <Box
          sx={{
            gap: 0.5,
            display: 'flex',
            typography: 'body2',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          ID: 123987
          <IconButton size="small">
            <Iconify width={18} icon="solar:copy-bold" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

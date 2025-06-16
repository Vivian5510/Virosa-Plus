import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useMockedUser } from 'src/auth/hooks';
import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export function PermissionDeniedView() {
  const [role, setRole] = useState('admin');

  const { user } = useMockedUser();

  const handleChangeRole = useCallback(
    (event: React.MouseEvent<HTMLElement>, newRole: string | null) => {
      if (newRole !== null) {
        setRole(newRole);
      }
    },
    []
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Permission"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Permission' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <ToggleButtonGroup
        exclusive
        value={role}
        size="small"
        onChange={handleChangeRole}
        sx={{ mb: 5, alignSelf: 'center' }}
      >
        <ToggleButton value="admin" aria-label="Admin role">
          Admin role
        </ToggleButton>
        <ToggleButton value="user" aria-label="User role">
          User role
        </ToggleButton>
      </ToggleButtonGroup>

      <RoleBasedGuard hasContent currentRole={user?.role} acceptRoles={[role]} sx={{ py: 10 }}>
        <Box sx={{ gap: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {Array.from({ length: 8 }, (_, index) => (
            <Card key={index}>
              <CardHeader title={`Card ${index + 1}`} subheader="Proin viverra ligula" />

              <Typography variant="body2" sx={{ px: 3, py: 2, color: 'text.secondary' }}>
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Vestibulum fringilla pede sit amet
                augue.
              </Typography>
            </Card>
          ))}
        </Box>
      </RoleBasedGuard>
    </DashboardContent>
  );
}

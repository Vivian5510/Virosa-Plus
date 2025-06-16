import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Iconify } from '../../iconify';

// ----------------------------------------------------------------------

export type NavDrawerHeaderProps = React.ComponentProps<'div'> & {
  title: string;
  onBack: () => void;
};

export const NavDrawerHeader = styled(({ onBack, title, ...other }: NavDrawerHeaderProps) => (
  <div {...other}>
    <IconButton onClick={onBack}>
      <Iconify
        width={16}
        icon="eva:arrow-ios-back-fill"
        sx={(theme) => ({ ...(theme.direction === 'rtl' && { transform: 'scaleX(-1)' }) })}
      />
    </IconButton>
    {title}
  </div>
))(({ theme }) => ({
  ...theme.typography.subtitle1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 1),
}));

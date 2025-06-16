import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { GithubIcon, GoogleIcon, TwitterIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  singInWithGithub?: () => void;
  signInWithTwitter?: () => void;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  singInWithGithub,
  signInWithTwitter,
  ...other
}: FormSocialsProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1.5,
          display: 'flex',
          justifyContent: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton color="inherit" onClick={signInWithGoogle}>
        <GoogleIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={singInWithGithub}>
        <GithubIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={signInWithTwitter}>
        <TwitterIcon width={22} />
      </IconButton>
    </Box>
  );
}

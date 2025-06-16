import type { Options } from 'react-markdown';
import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type MarkdownProps = Options &
  React.ComponentProps<'div'> & {
    asHtml?: boolean;
    sx?: SxProps<Theme>;
  };

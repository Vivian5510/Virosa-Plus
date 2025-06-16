import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button';
import type { IconButtonProps } from '@mui/material/IconButton';
import type { TypographyProps } from '@mui/material/Typography';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import type {
  Step,
  StoreHelpers,
  CallBackProps,
  TooltipRenderProps,
  Props as JoyrideProps,
} from 'react-joyride';

// ----------------------------------------------------------------------

export type WalktourCustomStep = Step & {
  slotProps?: {
    root?: BoxProps;
    title?: TypographyProps;
    content?: BoxProps;
    progress?: LinearProgressProps;
    closeBtn?: IconButtonProps;
    skipBtn?: ButtonProps;
    backBtn?: ButtonProps;
    nextBtn?: ButtonProps;
  };
};

export type WalktourTooltipProps = TooltipRenderProps & {
  step: WalktourCustomStep;
};

export type WalktourProps = JoyrideProps;

export type UseWalktourProps = {
  defaultRun?: boolean;
  steps: WalktourCustomStep[];
};

export type UseWalktourReturn = {
  run: boolean;
  steps: WalktourCustomStep[];
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  onCallback: (data: CallBackProps) => void;
  setHelpers: (storeHelpers: StoreHelpers) => void;
};

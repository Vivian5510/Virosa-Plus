import type { SvgIconProps } from '@mui/material/SvgIcon';

import { memo, forwardRef } from 'react';

import SvgIcon from '@mui/material/SvgIcon';

import { CONFIG } from 'src/global-config';

import { BackgroundShape } from './background-shape';

// ----------------------------------------------------------------------

type SvgProps = SvgIconProps & { hideBackground?: boolean };

const MotivationIllustration = forwardRef<SVGSVGElement, SvgProps>((props, ref) => {
  const { hideBackground, sx, ...other } = props;

  return (
    <SvgIcon
      ref={ref}
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          '--primary-lighter': theme.vars.palette.primary.lighter,
          '--primary-dark': theme.vars.palette.primary.dark,
          '--primary-darker': theme.vars.palette.primary.darker,
          width: 320,
          maxWidth: 1,
          flexShrink: 0,
          height: 'auto',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {!hideBackground && <BackgroundShape />}

      <image
        href={`${CONFIG.assetsDir}/assets/illustrations/characters/character-2.webp`}
        height="300"
        x="322"
        y="30"
      />

      <path
        fill="url(#paint0_linear_1_43)"
        d="M216.3 138v108.3c0 2.2-1.8 4-4 4H195c-2.2 0-4-1.8-4-4V138c0-2.2 1.8-4 4-4h17.3c2.2 0 4 1.8 4 4zm-55-68H144c-2.2 0-4 1.8-4 4v176.3c0 2.2 1.8 4 4 4h17.3c2.2 0 4-1.8 4-4V74c0-2.2-1.8-4-4-4zm102 93H246c-2.2 0-4 1.8-4 4v75.7c0 2.2 1.8 4 4 4h17.3c2.2 0 4-1.8 4-4V167c0-2.2-1.8-4-4-4z"
      />

      <path
        fill="var(--primary-darker)"
        d="M359.2 253.4c-1.1 3.1-2.3 6.3-3.7 9.7-5.1.1-10.1.3-15.2.4-3.3.1-6.9.2-9.6 2.1-5.2 3.6-.7 6.1-1.3 9.6-.7 4.2-4.9 5.1-9 5.1-14.1.1-27.7 4.6-41.5 7.3s-28.9 3.5-41.2-3.4c-.8-.5-1.7-1-2-2-.6-1.6.9-3.2 2.3-4.2 3.2-2.2 6.7-3.7 10.5-4.5 2.2-.5 4.5-.8 6.5-2 1.9-1.2 3.3-3.7 2.3-5.8-32.1 2-64.1 4.8-96 8.4-41.1 4.8-81.8 12.9-123 15.9h-.4c-2.9-2.9-5.5-6-7.9-9.3.2-.2.4-.5.6-.7 2-2.2 5-3.2 7.8-4.1 15.9-4.9 32.4-7.4 48.8-9.9 81.6-12.3 164.2-21.1 246.8-15.3 8.4.6 16.8 1.5 25.2 2.7z"
        opacity="0.24"
      />

      <path
        fill="#DFE3E8"
        d="M81.7 204.2l74 11v60.7h8.5v3.6h-19.5v-2.3h8.7v-50.3l-70-13.5v49h9.7v1.7H73.6V262h8.2v-57.8h-.1z"
      />

      <path
        fill="#C4CDD5"
        d="M80.6 204.2l74 11v60.7h8.5v3.6h-19.5v-2.3h8.7v-50.3l-70-13.5v49H92v1.7H72.4V262h8.2v-57.8z"
      />

      <defs>
        <linearGradient
          id="paint0_linear_1_43"
          x1="140"
          x2="276.5"
          y1="98"
          y2="312.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--primary-lighter)" />
          <stop offset="1" stopColor="var(--primary-dark)" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
});

export default memo(MotivationIllustration);

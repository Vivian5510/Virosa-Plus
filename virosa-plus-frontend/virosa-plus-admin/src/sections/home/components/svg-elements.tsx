import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import type { Transition, MotionProps } from 'framer-motion';

import { useId } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const baseStyles = (theme: Theme): SxProps<Theme> => ({
  zIndex: 2,
  display: 'none',
  color: 'grey.500',
  position: 'absolute',
  '& line': { strokeDasharray: 3, stroke: 'currentColor' },
  '& path': { fill: 'currentColor', stroke: 'currentColor' },
  [theme.breakpoints.up(1440)]: { display: 'block' },
});

const transition: Transition = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96],
};

type SvgRootProps = React.ComponentProps<typeof SvgRoot>;

const SvgRoot = styled(m.svg)``;

// ----------------------------------------------------------------------

export function FloatLine({ sx, vertical, ...other }: SvgRootProps & { vertical?: boolean }) {
  return (
    <SvgRoot
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 1,
          zIndex: 1,
          height: '1px',
          opacity: 0.24,
          ...(vertical && { width: '1px', height: 1 }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {vertical ? (
        <m.line
          x1="0.5"
          x2="0.5"
          y1="0"
          y2="100%"
          variants={{
            initial: { y2: '0%' },
            animate: { y2: '100%', transition },
          }}
        />
      ) : (
        <m.line
          x1="0"
          x2="100%"
          y1="0.5"
          y2="0.5"
          variants={{
            initial: { x2: '0%' },
            animate: { x2: '100%', transition },
          }}
        />
      )}
    </SvgRoot>
  );
}

// ----------------------------------------------------------------------

export function FloatPlusIcon({ sx, ...other }: SvgRootProps) {
  return (
    <SvgRoot
      variants={{
        initial: { scale: 0 },
        animate: { scale: 1, transition },
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 16,
          height: 16,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <path d="M8 0V16M16 8.08889H0" />
    </SvgRoot>
  );
}

// ----------------------------------------------------------------------

export function FloatXIcon({ sx, ...other }: SvgRootProps) {
  return (
    <SvgRoot
      variants={{
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition },
      }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 16,
          height: 16,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <path d="M14 2L7.96685 8.03315M7.96685 8.03315L2.0663 13.9337M7.96685 8.03315L13.9337 14M7.96685 8.03315L2 2.0663" />
    </SvgRoot>
  );
}

// ----------------------------------------------------------------------

export function FloatTriangleLeftIcon({ sx, ...other }: SvgRootProps) {
  return (
    <SvgRoot
      variants={{
        initial: { scaleY: 0 },
        animate: { scaleY: 1, transition },
      }}
      width="10"
      height="20"
      viewBox="0 0 10 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 10,
          height: 20,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <path d="M10 10L8.74228e-07 20L0 0L10 10Z" />
    </SvgRoot>
  );
}

export function FloatTriangleDownIcon({ sx, ...other }: SvgRootProps) {
  return (
    <SvgRoot
      variants={{
        initial: { scaleX: 0 },
        animate: { scaleX: 1, transition },
      }}
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 20,
          height: 10,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <path d="M10 10L0 0H20L10 10Z" />
    </SvgRoot>
  );
}

// ----------------------------------------------------------------------

export function CircleSvg({ sx, variants }: SvgRootProps) {
  const maskId = useId();
  const clipPathId = useId();
  const gradientId = useId();

  return (
    <SvgRoot
      width="100%"
      height="100%"
      viewBox="0 0 560 560"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      variants={variants ?? varFade('in')}
      sx={[
        () => ({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          m: 'auto',
          width: 560,
          height: 560,
          color: 'grey.500',
          position: 'absolute',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(280 0 0 280 280 280)"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity={0} />
        </radialGradient>

        <clipPath id={clipPathId}>
          <path fill="#fff" d="M0 0H560V560H0z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipPathId})`}>
        <mask
          id={maskId}
          style={{ maskType: 'alpha' }}
          width="560"
          height="560"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path fill={`url(#${gradientId})`} d="M0 0H560V560H0z" />
        </mask>

        <g stroke="currentColor" strokeDasharray={3} mask={`url(#${maskId})`} opacity={0.4}>
          <circle cx="280" cy="280" r="90" />
          <circle cx="280" cy="280" r="180" />
          <path d="M0 0l560 560M560 0L0 560" />
        </g>
      </g>
    </SvgRoot>
  );
}

// ----------------------------------------------------------------------

export function FloatDotIcon({ sx, ...other }: BoxProps<'span'> & MotionProps) {
  return (
    <Box
      component={m.span}
      variants={{
        initial: { scale: 0 },
        animate: { scale: 1, transition },
      }}
      sx={[
        (theme) => ({
          ...baseStyles(theme),
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'currentColor',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';
import type { PaletteColorKey } from 'src/theme/core';
import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export function Lines({ strokeCount }: { strokeCount: number }) {
  const drawVariants = {
    x: {
      hidden: { x2: 0, strokeOpacity: 0 },
      visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
          x2: '100%',
          strokeOpacity: 1,
          transition: {
            strokeOpacity: { delay, duration: 0.01 },
            x2: { delay, bounce: 0, duration: 1.5, type: 'spring' },
          },
        };
      },
    },
    y: {
      hidden: { y2: 0, strokeOpacity: 0 },
      visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
          y2: '100%',
          strokeOpacity: 1,
          transition: {
            strokeOpacity: { delay, duration: 0.01 },
            y2: { delay, bounce: 0, duration: 1.5, type: 'spring' },
          },
        };
      },
    },
  };

  const translateY = (index: number) =>
    strokeCount / 2 > index
      ? `translateY(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateY(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  const linesX = (
    <>
      {Array.from({ length: strokeCount }, (_, index) => (
        <m.line
          key={index}
          x1="0"
          x2="100%"
          y1="50%"
          y2="50%"
          variants={drawVariants.x}
          style={{
            transform: translateY(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
    </>
  );

  const translateX = (index: number) =>
    strokeCount / 2 > index
      ? `translateX(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateX(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  const linesY = (
    <>
      {Array.from({ length: strokeCount }, (_, index) => (
        <m.line
          key={index}
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
          variants={drawVariants.y}
          style={{
            transform: translateX(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
    </>
  );

  return (
    <>
      {linesX}
      {linesY}
    </>
  );
}

// ----------------------------------------------------------------------

export function Circles() {
  const drawCircle = {
    hidden: { opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return { opacity: 1, transition: { opacity: { delay, duration: 0.01 } } };
    },
  };

  return (
    <>
      <m.path
        variants={drawCircle}
        d="M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1"
        style={{
          strokeDasharray: 'var(--stroke-dasharray)',
          stroke: 'var(--hero-circle-stroke-color)',
          strokeWidth: 'var(--hero-circle-stroke-width)',
          transform: 'translate(calc(50% - 480px), calc(50% - 80px))',
        }}
      />

      <m.path
        variants={drawCircle}
        d="M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1"
        style={{
          strokeDasharray: 'var(--stroke-dasharray)',
          stroke: 'var(--hero-circle-stroke-color)',
          strokeWidth: 'var(--hero-circle-stroke-width)',
          transform: 'translate(calc(50% + 400px), calc(50% + 80px))',
        }}
      />

      <m.circle
        cx="50%"
        cy="50%"
        fill="var(--hero-circle-stroke-color)"
        style={{ transform: 'translate(calc(0% - 200px), calc(0% + 200px))' }}
        initial={{ r: 0 }}
        animate={{ r: 5 }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function PlusIcon() {
  const drawPlus = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        opacity: 1,
        pathLength: 1,
        transition: {
          opacity: { delay, duration: 0.01 },
          pathLength: { delay, bounce: 0, duration: 1.5, type: 'spring' },
        },
      };
    },
  };

  return (
    <>
      <m.path
        variants={drawPlus}
        d="M8 0V16M16 8.08889H0"
        stroke="var(--hero-plus-stroke-color)"
        style={{ transform: 'translate(calc(50% - 448px), calc(50% - 128px))' }}
      />

      <m.path
        variants={drawPlus}
        d="M8 0V16M16 8.08889H0"
        stroke="var(--hero-plus-stroke-color)"
        style={{ transform: 'translate(calc(50% + 432px), calc(50% + 192px))' }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function Texts({ sx, ...other }: BoxProps & MotionProps) {
  return (
    <Box
      component={m.div}
      variants={varFade('in')}
      sx={[
        () => ({
          left: 0,
          width: 1,
          bottom: 0,
          height: 200,
          position: 'absolute',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component="svg"
        sx={[
          (theme) => ({
            width: 1,
            height: 1,
            '& text': {
              fill: 'none',
              fontSize: 200,
              fontWeight: 800,
              strokeDasharray: 4,
              textTransform: 'uppercase',
              stroke: 'var(--hero-text-stroke-color)',
              strokeWidth: 'var(--hero-text-stroke-width)',
              fontFamily: theme.typography.fontSecondaryFamily,
            },
          }),
        ]}
      >
        <m.text
          x="0"
          y="12px"
          dominantBaseline="hanging"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 64, ease: 'linear', repeat: Infinity }}
        >
          Minimal Design System Minimal Design System
        </m.text>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type DotProps = Pick<MotionProps, 'animate' | 'transition'> & {
  sx?: SxProps<Theme>;
  color?: PaletteColorKey;
};

function Dot({ color = 'primary', animate, transition, sx, ...other }: DotProps) {
  return (
    <Box
      component={m.div}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.64, ease: [0.43, 0.13, 0.23, 0.96] } },
      }}
      sx={[
        () => ({
          width: 12,
          height: 12,
          top: '50%',
          left: '50%',
          position: 'absolute',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        animate={animate}
        transition={
          transition ?? {
            duration: 6,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }
        }
        sx={[
          (theme) => ({
            width: 1,
            height: 1,
            borderRadius: '50%',
            boxShadow: `0px -2px 4px 0px ${theme.vars.palette[color].main} inset`,
            background: `linear-gradient(135deg, ${theme.vars.palette[color].lighter}, ${theme.vars.palette[color].light})`,
            ...theme.applyStyles('dark', {
              boxShadow: `0px -2px 4px 0px ${theme.vars.palette[color].dark} inset`,
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Box>
  );
}

export function Dots() {
  return (
    <>
      <Dot
        color="error"
        animate={{ x: 24 }}
        sx={{ width: 14, height: 14, transform: 'translate(calc(50% - 457px), calc(50% - 259px))' }}
      />

      <Dot
        color="warning"
        animate={{ y: 24 }}
        sx={{ transform: 'translate(calc(50% - 356px), calc(50% + 37px))' }}
      />

      <Dot
        color="info"
        animate={{ x: 24 }}
        sx={{ transform: 'translate(calc(50% + 332px), calc(50% + 135px))' }}
      />

      <Dot
        color="secondary"
        animate={{ x: 24 }}
        sx={{ transform: 'translate(calc(50% + 430px), calc(50% - 160px))' }}
      />

      <Dot
        color="success"
        animate={{ y: 24 }}
        sx={{ transform: 'translate(calc(50% + 136px), calc(50% + 332px))' }}
      />
    </>
  );
}

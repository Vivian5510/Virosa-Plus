import type { BoxProps } from '@mui/material/Box';
import type { UseClientRectReturn } from 'minimal-shared/hooks';

import { useRef, useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useClientRect } from 'minimal-shared/hooks';
import { m, useSpring, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/global-config';
import { primaryColorPresets } from 'src/theme/with-settings';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <FloatPlusIcon sx={{ top: 72, left: 72 }} />
    <FloatLine sx={{ top: 80, left: 0 }} />
    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

export function HomeHighlightFeatures({ sx, ...other }: BoxProps) {
  const containerRoot = useClientRect();

  return (
    <Box
      component="section"
      sx={[
        {
          position: 'relative',
          pt: { xs: 10, md: 20 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container>
          <Stack
            ref={containerRoot.elementRef}
            spacing={5}
            sx={[
              () => ({
                textAlign: { xs: 'center', md: 'left' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }),
            ]}
          >
            <SectionTitle caption="App Features" title="Highlight" txtGradient="features" />

            <SvgIcon
              component={m.svg}
              variants={varFade('inDown', { distance: 24 })}
              sx={[
                () => ({
                  width: 28,
                  height: 28,
                  color: 'grey.500',
                }),
              ]}
            >
              <path
                d="M13.9999 6.75956L7.74031 0.5H20.2594L13.9999 6.75956Z"
                fill="currentColor"
                opacity={0.12}
              />
              <path
                d="M13.9998 23.8264L2.14021 11.9668H25.8593L13.9998 23.8264Z"
                fill="currentColor"
                opacity={0.24}
              />
            </SvgIcon>
          </Stack>
        </Container>
      </MotionViewport>

      <ScrollableContent containerRoot={containerRoot} />
    </Box>
  );
}

// ----------------------------------------------------------------------

const ITEMS = [
  {
    title: 'Dark mode',
    subtitle: 'A dark theme that feels easier on the eyes.',
    icon: 'solar:cloudy-moon-bold-duotone',
    imgUrl: [`${CONFIG.assetsDir}/assets/images/home/highlight-darkmode.webp`],
  },
  {
    title: 'Color presets',
    subtitle: 'Express your own style with just one click.',
    icon: 'solar:pallete-2-bold-duotone',
    imgUrl: [
      `${CONFIG.assetsDir}/assets/images/home/highlight-presets-1.webp`,
      `${CONFIG.assetsDir}/assets/images/home/highlight-presets-2.webp`,
      `${CONFIG.assetsDir}/assets/images/home/highlight-presets-3.webp`,
      `${CONFIG.assetsDir}/assets/images/home/highlight-presets-4.webp`,
      `${CONFIG.assetsDir}/assets/images/home/highlight-presets-5.webp`,
    ],
  },
  {
    title: 'Right-to-left',
    subtitle: 'Support languages such as Arabic, Persian, and Hebrew.',
    icon: 'solar:align-right-bold-duotone',
    imgUrl: [`${CONFIG.assetsDir}/assets/images/home/highlight-rtl.webp`],
  },
];

type ScrollContentProps = {
  containerRoot: UseClientRectReturn;
};

function ScrollableContent({ containerRoot }: ScrollContentProps) {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const containerRef = useRef(null);
  const containeRect = useClientRect(containerRef);

  const scrollRef = useRef(null);
  const scrollRect = useClientRect(scrollRef);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const [startScroll, setStartScroll] = useState(false);

  const physics = { damping: 16, mass: 0.12, stiffness: 80 };

  const scrollRange = (-scrollRect.scrollWidth + containeRect.width / 2) * (isRtl ? -1 : 1);

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollRange]), physics);

  const background = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.48, 0.58, 0.62, 0.72, 0.92],
    [
      `transparent`,
      `linear-gradient(180deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
      `linear-gradient(180deg, ${primaryColorPresets.preset1.light}, ${primaryColorPresets.preset1.dark})`,
      `linear-gradient(180deg, ${primaryColorPresets.preset2.light}, ${primaryColorPresets.preset2.dark})`,
      `linear-gradient(180deg, ${primaryColorPresets.preset3.light}, ${primaryColorPresets.preset3.dark})`,
      `linear-gradient(180deg, ${primaryColorPresets.preset4.light}, ${primaryColorPresets.preset4.dark})`,
      `linear-gradient(180deg, ${primaryColorPresets.preset5.light}, ${primaryColorPresets.preset5.dark})`,
      `linear-gradient(180deg, ${theme.palette.background.neutral}, ${theme.palette.background.neutral})`,
    ]
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest !== 0 && latest !== 1) {
      setStartScroll(true);
    } else {
      setStartScroll(false);
    }
  });

  return (
    <ScrollRoot ref={containerRef} sx={{ height: scrollRect.scrollWidth, minHeight: '100vh' }}>
      <ScrollContainer style={{ background }} data-scrolling={startScroll}>
        <ScrollContent
          ref={scrollRef}
          style={{ x }}
          layout
          sx={{ ml: `${containerRoot.left}px` }}
          transition={{ ease: 'linear', duration: 0.25 }}
        >
          {ITEMS.map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </ScrollContent>
      </ScrollContainer>
    </ScrollRoot>
  );
}

// ----------------------------------------------------------------------

const ScrollRoot = styled(m.div)(({ theme }) => ({
  zIndex: 9,
  position: 'relative',
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: { paddingTop: theme.spacing(8) },
}));

const ScrollContainer = styled(m.div)(({ theme }) => ({
  top: 0,
  height: '100vh',
  display: 'flex',
  position: 'sticky',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: theme.transitions.create(['background-color']),
  '&[data-scrolling="true"]': { justifyContent: 'center' },
}));

const ScrollContent = styled(m.div)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  transition: theme.transitions.create(['margin-left', 'margin-top']),
  [theme.breakpoints.up('md')]: { gap: theme.spacing(8), paddingLeft: theme.spacing(0) },
}));

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: (typeof ITEMS)[number];
};

function Item({ item, sx, ...other }: ItemProps) {
  return (
    <Box sx={[{ flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box sx={{ mb: 6, gap: 2, display: 'flex' }}>
        <Iconify width={28} icon={item.icon} sx={{ mt: '10px' }} />
        <Stack spacing={2}>
          <Typography variant="h3">{item.title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{item.subtitle}</Typography>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', gap: { xs: 5, md: 8 } }}>
        {item.imgUrl.map((url) => (
          <Box
            key={url}
            sx={[
              (theme) => ({
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                ...theme.applyStyles('dark', {
                  boxShadow: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
                }),
              }),
            ]}
          >
            <Box
              component="img"
              alt={url}
              src={url}
              sx={{
                width: {
                  xs: 480,
                  sm: 640,
                  md: 800,
                  lg: 1140,
                  xl: 1280,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

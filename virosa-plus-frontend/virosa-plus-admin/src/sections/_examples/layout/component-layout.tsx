import type { Theme, CSSObject } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';
import type { CustomBreadcrumbsProps } from 'src/components/custom-breadcrumbs';

import { useCallback } from 'react';
import { kebabCase } from 'es-toolkit';
import { varAlpha } from 'minimal-shared/utils';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { componentLayoutClasses } from './classes';
import { useScroll, useHashScroll } from './hooks';
import { allComponents } from './nav-config-components';
import { PrimaryNav, SecondaryNav } from './component-nav';

// ----------------------------------------------------------------------

type ComponentLayoutProps = React.ComponentProps<typeof LayoutRoot> & {
  offsetValue?: number;
  queryClassName?: string;
  containerProps?: ContainerProps;
  sectionData?: {
    name: string;
    description?: string;
    component: React.ReactNode;
  }[];
  heroProps?: CustomBreadcrumbsProps & {
    overrideContent?: React.ReactNode;
    additionalContent?: React.ReactNode;
    topNode?: React.ReactNode;
    bottomNode?: React.ReactNode;
  };
};

const OFFSET_TOP = 120;

const cssVars = (theme: Theme): CSSObject => ({
  // nav
  '--nav-gutters': '16px',
  '--nav-width': '220px',
  '--primary-nav-list-gap': '24px',
  '--primary-nav-item-gap': '6px',
  '--secondary-nav-item-gap': '10px',
  // content
  '--section-gap': '24px',
  '--section-padding': '24px',
  // layout
  '--layout-gutters': '16px',
  '--layout-gap': '24px',
  [theme.breakpoints.up('md')]: { '--layout-gutters': '20px' },
  [theme.breakpoints.up('xl')]: { '--layout-gutters': '80px' },
});

export function ComponentLayout({
  sx,
  children,
  heroProps,
  sectionData,
  containerProps,
  queryClassName = 'scroll__to__view',
  offsetValue = 0.3, // 0 ~ 1 => 0% => 100%
  ...other
}: ComponentLayoutProps) {
  const activeIndex = useScroll(queryClassName, offsetValue);
  const scrollToHash = useHashScroll(OFFSET_TOP);

  const scrollToSection = useCallback(
    (index: number) => {
      const sections = document.querySelectorAll(`.${queryClassName}`);
      if (sections[index]) {
        const id = sections[index].id;
        scrollToHash(`#${id}`);
      }
    },
    [queryClassName, scrollToHash]
  );

  const renderPrimaryNav = () => <PrimaryNav navData={allComponents} />;

  const renderSecondaryNav = () =>
    !!sectionData?.length && (
      <SecondaryNav navData={sectionData} activeItem={activeIndex} onClickItem={scrollToSection} />
    );

  const renderHero = () => (
    <LayoutHero sx={heroProps?.sx}>
      <Container>
        {heroProps?.overrideContent ?? (
          <>
            <CustomBreadcrumbs
              {...heroProps}
              links={[{ name: 'Components', href: paths.components }, { name: heroProps?.heading }]}
            />
            {heroProps?.additionalContent}
          </>
        )}
      </Container>
    </LayoutHero>
  );

  const renderContent = () => (
    <LayoutContainer maxWidth="md" {...containerProps}>
      {children ?? (
        <LayoutSection>
          {sectionData?.map((section) => {
            const hashId = `${kebabCase(section.name)}`;

            return (
              <Card key={section.name} id={hashId} className={queryClassName}>
                <CardHeader
                  titleTypographyProps={{
                    component: Link,
                    href: `#${hashId}`,
                    color: 'inherit',
                    sx: { display: 'inline-flex', '&:hover': { opacity: 0.8 } },
                  }}
                  title={section.name}
                  subheader={section.description}
                />
                <CardContent>{section.component}</CardContent>
              </Card>
            );
          })}
        </LayoutSection>
      )}
    </LayoutContainer>
  );

  return (
    <>
      {heroProps?.topNode}
      {renderHero()}
      {heroProps?.bottomNode}

      <LayoutRoot sx={[cssVars, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        {renderPrimaryNav()}
        {renderContent()}
        {renderSecondaryNav()}
      </LayoutRoot>
    </>
  );
}

// ----------------------------------------------------------------------

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: 'var(--layout-gap)',
  padding: theme.spacing(8, 'var(--layout-gutters)', 15, 'var(--layout-gutters)'),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'var(--nav-width) auto',
    [`& .${componentLayoutClasses.primaryNav}`]: {
      display: 'flex',
    },
  },
  [theme.breakpoints.up(1440)]: {
    gridTemplateColumns: 'var(--nav-width) auto var(--nav-width)',
    [`& .${componentLayoutClasses.secondaryNav}`]: {
      display: 'flex',
    },
  },
}));

const LayoutContainer = styled(Container)(({ theme }) => ({
  padding: 0,
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    padding: 0,
  },
}));

const LayoutSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--section-gap)',
  padding: 'var(--section-padding)',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.vars.palette.background.neutral,
}));

const LayoutHero = styled('section')(({ theme }) => {
  const backgroundStyles: CSSObject = {
    ...theme.mixins.bgGradient({
      images: [
        `linear-gradient(0deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
        `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
      ],
    }),
    top: 0,
    left: 0,
    zIndex: -1,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'scaleX(-1)',
  };

  return {
    minHeight: 240,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(5, 0),
    '&::before': backgroundStyles,
  };
});

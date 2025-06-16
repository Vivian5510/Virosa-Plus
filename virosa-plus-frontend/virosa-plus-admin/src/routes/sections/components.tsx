import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router';

import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/components'));

// Foundation
const GridPage = lazy(() => import('src/pages/components/foundation/grid'));
const IconsPage = lazy(() => import('src/pages/components/foundation/icons'));
const ColorsPage = lazy(() => import('src/pages/components/foundation/colors'));
const ShadowsPage = lazy(() => import('src/pages/components/foundation/shadows'));
const TypographyPage = lazy(() => import('src/pages/components/foundation/typography'));

// MUI components
const ChipPage = lazy(() => import('src/pages/components/mui/chip'));
const ListPage = lazy(() => import('src/pages/components/mui/list'));
const MenuPage = lazy(() => import('src/pages/components/mui/menu'));
const TabsPage = lazy(() => import('src/pages/components/mui/tabs'));
const AlertPage = lazy(() => import('src/pages/components/mui/alert'));
const BadgePage = lazy(() => import('src/pages/components/mui/badge'));
const TablePage = lazy(() => import('src/pages/components/mui/table'));
const AvatarPage = lazy(() => import('src/pages/components/mui/avatar'));
const DialogPage = lazy(() => import('src/pages/components/mui/dialog'));
const RatingPage = lazy(() => import('src/pages/components/mui/rating'));
const SliderPage = lazy(() => import('src/pages/components/mui/slider'));
const SwitchPage = lazy(() => import('src/pages/components/mui/switch'));
const DrawerPage = lazy(() => import('src/pages/components/mui/drawer'));
const ButtonsPage = lazy(() => import('src/pages/components/mui/buttons'));
const PopoverPage = lazy(() => import('src/pages/components/mui/popover'));
const StepperPage = lazy(() => import('src/pages/components/mui/stepper'));
const TooltipPage = lazy(() => import('src/pages/components/mui/tooltip'));
const CheckboxPage = lazy(() => import('src/pages/components/mui/checkbox'));
const ProgressPage = lazy(() => import('src/pages/components/mui/progress'));
const TimelinePage = lazy(() => import('src/pages/components/mui/timeline'));
const AccordionPage = lazy(() => import('src/pages/components/mui/accordion'));
const TextFieldPage = lazy(() => import('src/pages/components/mui/textfield'));
const PaginationPage = lazy(() => import('src/pages/components/mui/pagination'));
const BreadcrumbsPage = lazy(() => import('src/pages/components/mui/breadcrumbs'));
const AutocompletePage = lazy(() => import('src/pages/components/mui/autocomplete'));
const RadioButtonsPage = lazy(() => import('src/pages/components/mui/radio-button'));
const TransferListPage = lazy(() => import('src/pages/components/mui/transfer-list'));
// MUI X
const TreeViewPage = lazy(() => import('src/pages/components/mui/tree-view'));
const DataGridPage = lazy(() => import('src/pages/components/mui/data-grid'));
const DatePickersPage = lazy(() => import('src/pages/components/mui/date-pickers'));

// Extra components
const MapPage = lazy(() => import('src/pages/components/extra/map'));
const DndPage = lazy(() => import('src/pages/components/extra/dnd'));
const ChartPage = lazy(() => import('src/pages/components/extra/chart'));
const ImagePage = lazy(() => import('src/pages/components/extra/image'));
const LabelPage = lazy(() => import('src/pages/components/extra/label'));
const LayoutPage = lazy(() => import('src/pages/components/extra/layout'));
const EditorPage = lazy(() => import('src/pages/components/extra/editor'));
const UploadPage = lazy(() => import('src/pages/components/extra/upload'));
const AnimatePage = lazy(() => import('src/pages/components/extra/animate'));
const ScrollbarPage = lazy(() => import('src/pages/components/extra/scroll'));
const LightboxPage = lazy(() => import('src/pages/components/extra/lightbox'));
const SnackbarPage = lazy(() => import('src/pages/components/extra/snackbar'));
const MarkdownPage = lazy(() => import('src/pages/components/extra/markdown'));
const WalktourPage = lazy(() => import('src/pages/components/extra/walktour'));
const CarouselsPage = lazy(() => import('src/pages/components/extra/carousel'));
const MegaMenuPage = lazy(() => import('src/pages/components/extra/mega-menu'));
const UtilitiesPage = lazy(() => import('src/pages/components/extra/utilities'));
const FormWizardPage = lazy(() => import('src/pages/components/extra/form-wizard'));
const OrgChartPage = lazy(() => import('src/pages/components/extra/organization-chart'));
const MultiLanguagePage = lazy(() => import('src/pages/components/extra/multi-language'));
const NavigationBarPage = lazy(() => import('src/pages/components/extra/navigation-bar'));
const FormValidationPage = lazy(() => import('src/pages/components/extra/form-validation'));
const ScrollProgressPage = lazy(() => import('src/pages/components/extra/scroll-progress'));

// ----------------------------------------------------------------------

export const componentsRoutes: RouteObject[] = [
  {
    path: 'components',
    element: (
      <Suspense>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Suspense>
    ),
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: 'foundation',
        children: [
          { index: true, element: <Navigate to="/components/foundation/colors" replace /> },
          { path: 'grid', element: <GridPage /> },
          { path: 'icons', element: <IconsPage /> },
          { path: 'colors', element: <ColorsPage /> },
          { path: 'shadows', element: <ShadowsPage /> },
          { path: 'typography', element: <TypographyPage /> },
        ],
      },
      {
        path: 'mui',
        children: [
          { index: true, element: <Navigate to="/components/mui/accordion" replace /> },
          { path: 'chip', element: <ChipPage /> },
          { path: 'list', element: <ListPage /> },
          { path: 'menu', element: <MenuPage /> },
          { path: 'tabs', element: <TabsPage /> },
          { path: 'alert', element: <AlertPage /> },
          { path: 'badge', element: <BadgePage /> },
          { path: 'table', element: <TablePage /> },
          { path: 'avatar', element: <AvatarPage /> },
          { path: 'dialog', element: <DialogPage /> },
          { path: 'rating', element: <RatingPage /> },
          { path: 'slider', element: <SliderPage /> },
          { path: 'switch', element: <SwitchPage /> },
          { path: 'drawer', element: <DrawerPage /> },
          { path: 'buttons', element: <ButtonsPage /> },
          { path: 'popover', element: <PopoverPage /> },
          { path: 'stepper', element: <StepperPage /> },
          { path: 'tooltip', element: <TooltipPage /> },
          { path: 'checkbox', element: <CheckboxPage /> },
          { path: 'progress', element: <ProgressPage /> },
          { path: 'timeline', element: <TimelinePage /> },
          { path: 'data-grid', element: <DataGridPage /> },
          { path: 'tree-view', element: <TreeViewPage /> },
          { path: 'accordion', element: <AccordionPage /> },
          { path: 'textfield', element: <TextFieldPage /> },
          { path: 'pagination', element: <PaginationPage /> },
          { path: 'breadcrumbs', element: <BreadcrumbsPage /> },
          { path: 'date-pickers', element: <DatePickersPage /> },
          { path: 'autocomplete', element: <AutocompletePage /> },
          { path: 'radio-button', element: <RadioButtonsPage /> },
          { path: 'transfer-list', element: <TransferListPage /> },
        ],
      },
      {
        path: 'extra',
        children: [
          { index: true, element: <Navigate to="/components/extra/animate" replace /> },
          { path: 'map', element: <MapPage /> },
          { path: 'dnd', element: <DndPage /> },
          { path: 'chart', element: <ChartPage /> },
          { path: 'image', element: <ImagePage /> },
          { path: 'label', element: <LabelPage /> },
          { path: 'layout', element: <LayoutPage /> },
          { path: 'editor', element: <EditorPage /> },
          { path: 'upload', element: <UploadPage /> },
          { path: 'animate', element: <AnimatePage /> },
          { path: 'scroll', element: <ScrollbarPage /> },
          { path: 'lightbox', element: <LightboxPage /> },
          { path: 'snackbar', element: <SnackbarPage /> },
          { path: 'markdown', element: <MarkdownPage /> },
          { path: 'walktour', element: <WalktourPage /> },
          { path: 'carousel', element: <CarouselsPage /> },
          { path: 'mega-menu', element: <MegaMenuPage /> },
          { path: 'utilities', element: <UtilitiesPage /> },
          { path: 'form-wizard', element: <FormWizardPage /> },
          { path: 'organization-chart', element: <OrgChartPage /> },
          { path: 'multi-language', element: <MultiLanguagePage /> },
          { path: 'navigation-bar', element: <NavigationBarPage /> },
          { path: 'form-validation', element: <FormValidationPage /> },
          { path: 'scroll-progress', element: <ScrollProgressPage /> },
        ],
      },
    ],
  },
];

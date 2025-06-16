import type { Theme, SxProps } from '@mui/material/styles';

import { ChartPie } from './chart-pie';
import { ChartBar } from './chart-bar';
import { ChartLine } from './chart-line';
import { ChartArea } from './chart-area';
import { ChartMixed } from './chart-mixed';
import { ChartDonut } from './chart-donut';
import { ChartScatter } from './chart-scatter';
import { ChartTreemap } from './chart-treemap';
import { ChartHeatmap } from './chart-heatmap';
import { ChartBoxPlot } from './chart-box-plot';
import { ChartRadarBar } from './chart-radar-bar';
import { ChartRadialBar } from './chart-radial-bar';
import { ChartStrokedGauge } from './chart-stroked-gauge';
import { ChartColumnSingle } from './chart-column-single';
import { ChartColumnStacked } from './chart-column-stacked';
import { ComponentBox, ComponentLayout } from '../../layout';
import { ChartColumnNegative } from './chart-column-negative';
import { ChartColumnMultiple } from './chart-column-multiple';
import { ChartSemiCircleGauge } from './chart-semi-circle-gauge';

// ----------------------------------------------------------------------

const componentBoxStyles: SxProps<Theme> = {
  p: 3,
  gap: 0,
  flexDirection: 'column',
};

const DEMO_COMPONENTS = [
  {
    name: 'Line',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartLine
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            series: [
              { name: 'Series A', data: [32, 40, 28, 42, 64, 72, 56, 80, 100] },
              { name: 'Series B', data: [12, 32, 45, 32, 34, 52, 40, 60, 60] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Area',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartArea
          chart={{
            categories: [
              '2023-09-19T00:00:00.000Z',
              '2023-09-19T01:30:00.000Z',
              '2023-09-19T02:30:00.000Z',
              '2023-09-19T03:30:00.000Z',
              '2023-09-19T04:30:00.000Z',
              '2023-09-19T05:30:00.000Z',
              '2023-09-19T06:30:00.000Z',
              '2023-09-19T07:30:00.000Z',
              '2023-09-19T08:30:00.000Z',
            ],
            series: [
              { name: 'Series A', data: [32, 40, 28, 42, 64, 72, 56, 80, 100] },
              { name: 'Series B', data: [12, 32, 45, 32, 34, 52, 40, 60, 60] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Column single',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartColumnSingle
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            series: [{ data: [32, 40, 28, 42, 64, 72, 56, 80, 100] }],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Column multiple',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartColumnMultiple
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            series: [
              { name: 'Series A', data: [32, 40, 28, 42, 64, 72, 56, 80, 100] },
              { name: 'Series B', data: [12, 32, 45, 32, 34, 52, 40, 60, 60] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Column stacked',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartColumnStacked
          chart={{
            categories: [
              '01/01/2011 GMT',
              '01/02/2011 GMT',
              '01/03/2011 GMT',
              '01/04/2011 GMT',
              '01/05/2011 GMT',
              '01/06/2011 GMT',
            ],
            series: [
              { name: 'Series A', data: [44, 55, 41, 67, 22, 43] },
              { name: 'Series B', data: [13, 23, 20, 8, 13, 27] },
              { name: 'Series C', data: [11, 17, 15, 15, 21, 14] },
              { name: 'Series D', data: [21, 7, 25, 13, 22, 8] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Column negative',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartColumnNegative
          chart={{
            categories: [
              '2011-01-01',
              '2011-02-01',
              '2011-03-01',
              '2011-04-01',
              '2011-05-01',
              '2011-06-01',
              '2011-07-01',
              '2011-08-01',
              '2011-09-01',
              '2011-10-01',
              '2011-11-01',
              '2011-12-01',
              '2012-01-01',
              '2012-02-01',
              '2012-03-01',
              '2012-04-01',
              '2012-05-01',
              '2012-06-01',
              '2012-07-01',
              '2012-08-01',
              '2012-09-01',
              '2012-10-01',
              '2012-11-01',
              '2012-12-01',
              '2013-01-01',
              '2013-02-01',
              '2013-03-01',
              '2013-04-01',
              '2013-05-01',
              '2013-06-01',
              '2013-07-01',
              '2013-08-01',
              '2013-09-01',
            ],
            series: [
              {
                data: [
                  1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88,
                  13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3,
                  -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4,
                ],
              },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Bar',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartBar
          chart={{
            categories: [
              'Italy',
              'Japan',
              'China',
              'Canada',
              'France',
              'Germany',
              'South Korea',
              'Netherlands',
              'United States',
              'United Kingdom',
            ],
            series: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Mixed',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartMixed
          chart={{
            categories: [
              '01/01/2023',
              '02/01/2023',
              '03/01/2023',
              '04/01/2023',
              '05/01/2023',
              '06/01/2023',
              '07/01/2023',
              '08/01/2023',
              '09/01/2023',
              '10/01/2023',
              '11/01/2023',
            ],
            series: [
              {
                name: 'Series A',
                type: 'column',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Series B',
                type: 'area',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Series C',
                type: 'line',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Scatter',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartScatter
          chart={{
            series: [
              {
                name: 'Series A',
                data: [
                  [16.4, 5.4],
                  [21.7, 2],
                  [25.4, 3],
                  [19, 2],
                  [10.9, 1],
                  [13.6, 3.2],
                  [10.9, 7.4],
                  [10.9, 0],
                  [10.9, 8.2],
                  [16.4, 0],
                  [16.4, 1.8],
                  [13.6, 0.3],
                  [13.6, 0],
                  [29.9, 0],
                  [27.1, 2.3],
                  [16.4, 0],
                  [13.6, 3.7],
                  [10.9, 5.2],
                  [16.4, 6.5],
                  [10.9, 0],
                ],
              },
              {
                name: 'Series B',
                data: [
                  [36.4, 13.4],
                  [1.7, 11],
                  [5.4, 8],
                  [9, 17],
                  [1.9, 4],
                  [3.6, 12.2],
                  [1.9, 14.4],
                  [1.9, 9],
                  [1.9, 13.2],
                  [1.4, 7],
                  [6.4, 8.8],
                  [3.6, 4.3],
                  [1.6, 10],
                  [9.9, 2],
                  [7.1, 15],
                  [1.4, 0],
                  [3.6, 13.7],
                  [1.9, 15.2],
                  [6.4, 16.5],
                  [0.9, 10],
                ],
              },
              {
                name: 'Series C',
                data: [
                  [21.7, 3],
                  [23.6, 3.5],
                  [24.6, 3],
                  [29.9, 3],
                  [21.7, 20],
                  [23, 2],
                  [10.9, 3],
                  [28, 4],
                  [27.1, 0.3],
                  [16.4, 4],
                  [13.6, 0],
                  [19, 5],
                  [22.4, 3],
                  [24.5, 3],
                  [32.6, 3],
                  [27.1, 4],
                  [29.6, 6],
                  [31.6, 8],
                  [21.6, 5],
                  [20.9, 4],
                ],
              },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Pie',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartPie
          chart={{
            categories: ['Series A', 'Series B', 'Series C', 'Series D'],
            series: [44, 55, 13, 43],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Donut',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartDonut
          chart={{
            categories: ['Series A', 'Series B', 'Series C', 'Series D'],
            series: [44, 55, 13, 43],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Radial bar',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartRadialBar chart={{ categories: ['Apples', 'Oranges'], series: [24, 50] }} />
      </ComponentBox>
    ),
  },
  {
    name: 'Radar bar',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartRadarBar
          chart={{
            categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
            series: [
              { name: 'Series A', data: [80, 50, 30, 40, 100, 20] },
              { name: 'Series B', data: [20, 30, 40, 80, 20, 80] },
              { name: 'Series C', data: [44, 76, 78, 13, 43, 10] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Semi circle gauge',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartSemiCircleGauge chart={{ series: [75] }} />
      </ComponentBox>
    ),
  },
  {
    name: 'Stroked gauge',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartStrokedGauge chart={{ series: [75] }} />
      </ComponentBox>
    ),
  },
  {
    name: 'BoxPlot',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartBoxPlot
          chart={{
            series: [
              {
                data: [
                  { x: 'Jan 2015', y: [54, 66, 69, 75, 88] },
                  { x: 'Jan 2016', y: [43, 65, 69, 76, 81] },
                  { x: 'Jan 2017', y: [31, 39, 45, 51, 59] },
                  { x: 'Jan 2018', y: [39, 46, 55, 65, 71] },
                  { x: 'Jan 2019', y: [29, 31, 35, 39, 44] },
                  { x: 'Jan 2020', y: [41, 49, 58, 61, 67] },
                  { x: 'Jan 2021', y: [54, 59, 66, 71, 88] },
                ],
              },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Heatmap',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartHeatmap
          chart={{
            categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00'],
            series: [
              { name: 'Metric 1', data: [45, 52, 38, 45, 19, 23, 2] },
              { name: 'Metric 2', data: [26, 21, 20, 6, 8, 15, 12] },
              { name: 'Metric 3', data: [30, 22, 16, 29, 15, 10, 20] },
              { name: 'Metric 4', data: [44, 55, 41, 37, 22, 43, 21] },
              { name: 'Metric 5', data: [35, 41, 36, 26, 45, 48, 52] },
              { name: 'Metric 6', data: [21, 35, 22, 27, 13, 28, 37] },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
  {
    name: 'Treemap',
    component: (
      <ComponentBox sx={componentBoxStyles}>
        <ChartTreemap
          chart={{
            series: [
              {
                name: 'Desktops',
                data: [
                  { x: 'ABC', y: 10 },
                  { x: 'DEF', y: 60 },
                  { x: 'XYZ', y: 41 },
                ],
              },
              {
                name: 'Mobile',
                data: [
                  { x: 'ABCD', y: 10 },
                  { x: 'DEFG', y: 20 },
                  { x: 'WXYZ', y: 51 },
                  { x: 'PQR', y: 30 },
                  { x: 'MNO', y: 20 },
                  { x: 'CDE', y: 30 },
                ],
              },
            ],
          }}
        />
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function ChartView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Chart',
        moreLinks: ['https://apexcharts.com'],
      }}
    />
  );
}

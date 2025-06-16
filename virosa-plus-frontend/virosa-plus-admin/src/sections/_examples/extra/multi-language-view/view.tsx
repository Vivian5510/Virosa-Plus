import type { Dayjs } from 'dayjs';
import type { LanguageValue } from 'src/locales';

import dayjs from 'dayjs';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fDate } from 'src/utils/format-time';
import { fData, fNumber, fPercent, fCurrency, fShortenNumber } from 'src/utils/format-number';

import { allLangs, useTranslate } from 'src/locales';

import { FlagIcon } from 'src/components/flag-icon';
import { NavSectionVertical } from 'src/components/nav-section';

import { ComponentBox, ComponentLayout } from '../../layout';
import { navData as clientNavData } from './nav-config-translate';

// ----------------------------------------------------------------------

export function MultiLanguageView() {
  const trans = useTranslate();
  const navTrans = useTranslate('navbar');

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  const navData = clientNavData(navTrans.t);

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const renderMenu = () => (
    <Paper
      sx={[
        (theme) => ({
          m: 2,
          pb: 1,
          pt: 2,
          px: 2,
          right: 0,
          zIndex: 1,
          top: '25%',
          position: 'fixed',
          borderRadius: 1.5,
          bgcolor: 'background.paper',
          boxShadow: theme.vars.customShadows.dropdown,
        }),
      ]}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.sexcondary' }}>
        Langs
      </Typography>

      <RadioGroup
        value={trans.currentLang?.value}
        onChange={(event) => {
          trans.onChangeLang(event.target.value as LanguageValue);
        }}
      >
        {allLangs.map((lang) => (
          <FormControlLabel
            key={lang.value}
            value={lang.value}
            label={lang.label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </Paper>
  );

  const DEMO_COMPONENTS = [
    {
      name: 'Flexible',
      component: (
        <ComponentBox sx={{ flexDirection: 'column', alignItems: 'unset' }}>
          <Box
            sx={{
              gap: 1,
              display: 'flex',
              typography: 'h3',
              alignItems: 'center',
            }}
          >
            <FlagIcon code={trans.currentLang.countryCode} />
            {trans.t('demo.lang')}
          </Box>

          <Typography>{trans.t('demo.description')}</Typography>
        </ComponentBox>
      ),
    },
    {
      name: 'System (MUI)',
      component: (
        <ComponentBox sx={{ flexDirection: 'column', alignItems: 'unset' }}>
          <Box sx={{ typography: 'subtitle2' }}>Supports other components including:</Box>

          <Box
            component="ul"
            sx={{
              pl: 3,
              typography: 'body2',
              listStyleType: 'disc',
            }}
          >
            <li> Data Grid</li>
            <li> Date Pickers</li>
          </Box>

          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={[
              (theme) => ({
                borderRadius: 1.5,
                border: `solid 1px ${theme.vars.palette.divider}`,
              }),
            ]}
          />
        </ComponentBox>
      ),
    },
    {
      name: 'Nav',
      component: (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            width: 1,
            maxWidth: 320,
            borderRadius: 2,
          }}
        >
          <NavSectionVertical data={navData} />
        </Paper>
      ),
    },
    {
      name: 'Numbers',
      component: (
        <Box
          sx={{
            rowGap: 5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <NumericDisplay
            title="Currency"
            type="currency"
            data={[2217.01, 247598.18, 677606.08, 4734447.51, 8471442.09, undefined, null, NaN, 0]}
          />

          <NumericDisplay
            title="Percent"
            type="percent"
            data={[1.7, 17.67, 28.1, 41.3, 91.16, undefined, null, NaN, 0]}
          />

          <NumericDisplay
            title="Shorten"
            type="shorten"
            data={[719, 719.63, 3683.72, 5583407.51, 3345583407.51, undefined, null, NaN, 0]}
          />

          <NumericDisplay
            title="Data"
            type="data"
            data={[719, 719.63, 3683.72, 5583407.51, 3345583407.51, undefined, null, NaN, 0]}
          />

          <NumericDisplay
            title="Number"
            type="number"
            data={[451, 451.82, 1081.62, 27921.9, 600668.81, 7587054.86, undefined, null, NaN, 0]}
          />

          <ComponentBox
            title="Date input"
            sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}
          >
            <DatePicker
              label="Input"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <Box sx={{ typography: 'subtitle2' }}>Output: {fDate(date)}</Box>
          </ComponentBox>
        </Box>
      ),
    },
  ];

  return (
    <>
      {renderMenu()}

      <ComponentLayout
        sectionData={DEMO_COMPONENTS}
        heroProps={{
          heading: 'Multi language',
          moreLinks: [
            'https://react.i18next.com',
            'https://mui.com/guides/localization/#main-content',
          ],
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type NumericDisplayProps = {
  data: any[];
  title: string;
  type: 'currency' | 'percent' | 'shorten' | 'data' | 'number';
};

function NumericDisplay({ data, type, title }: NumericDisplayProps) {
  const renderLabel = (value: any) => {
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    if (String(value) === 'NaN') {
      return 'NaN';
    }

    return value;
  };

  return (
    <ComponentBox
      title={title}
      sx={[
        (theme) => ({
          ...theme.typography.body2,
          pb: 3,
          gap: 1,
          alignItems: 'unset',
          flexDirection: 'column',
        }),
      ]}
    >
      {data.map((numb, index) => (
        <Box key={String(index)}>
          <Box component="span" sx={{ color: 'text.primary' }}>
            {renderLabel(numb)}
          </Box>

          <Box component="span" sx={{ color: 'text.secondary' }}>
            {' => '}
            {(type === 'currency' && fCurrency(numb)) ||
              (type === 'percent' && fPercent(numb)) ||
              (type === 'shorten' && fShortenNumber(numb)) ||
              (type === 'data' && fData(numb)) ||
              (type === 'number' && fNumber(numb))}
          </Box>
        </Box>
      ))}
    </ComponentBox>
  );
}

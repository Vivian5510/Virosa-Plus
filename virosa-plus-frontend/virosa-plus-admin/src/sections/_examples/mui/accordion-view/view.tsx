import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const _accordions = Array.from({ length: 4 }, (_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Accordion ${index + 1}`,
  subHeading: _mock.postTitle(index),
  detail: _mock.description(index),
}));

// ----------------------------------------------------------------------

export function AccordionView() {
  const [controlled, setControlled] = useState<string | false>(false);

  const handleChangeControlled =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setControlled(isExpanded ? panel : false);
    };

  const DEMO_COMPONENTS = [
    {
      name: 'Simple',
      component: (
        <ComponentBox>
          <div>
            {_accordions.map((accordion, index) => (
              <Accordion key={accordion.value} disabled={index === 2}>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1">{accordion.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </ComponentBox>
      ),
    },
    {
      name: 'Controlled',
      component: (
        <ComponentBox>
          <div>
            {_accordions.map((item, index) => (
              <Accordion
                key={item.value}
                disabled={index === 3}
                expanded={controlled === item.value}
                onChange={handleChangeControlled(item.value)}
              >
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
                    {item.heading}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.subHeading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Accordion',
        moreLinks: ['https://mui.com/material-ui/react-accordion/'],
      }}
    />
  );
}

import type { PopoverArrow } from 'src/components/custom-popover';

import { useState, useCallback } from 'react';
import { usePopover, usePopoverHover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

export function PopoverView() {
  const [arrow, setArrow] = useState<PopoverArrow['placement']>('top-left');

  const clickPopover = usePopover();
  const customizedPopover = usePopover();
  const hoverPopover = usePopoverHover<HTMLButtonElement>();

  const handleChangePopoverArrow = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setArrow(event.target.value as PopoverArrow['placement']);
  }, []);

  const renderClickPopover = () => (
    <>
      <Button variant="contained" onClick={clickPopover.onOpen}>
        Click popover
      </Button>
      <CustomPopover
        open={clickPopover.open}
        onClose={clickPopover.onClose}
        anchorEl={clickPopover.anchorEl}
        slotProps={{ arrow: { placement: 'top-center' } }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Etiam feugiat lorem non metus
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
          </Typography>
        </Box>
      </CustomPopover>
    </>
  );

  const renderHoverPopover = () => (
    <>
      <Button
        ref={hoverPopover.elementRef}
        variant="outlined"
        onMouseEnter={hoverPopover.onOpen}
        onMouseLeave={hoverPopover.onClose}
      >
        Hover popover
      </Button>

      {hoverPopover.open && (
        <CustomPopover
          open={hoverPopover.open}
          anchorEl={hoverPopover.anchorEl}
          slotProps={{
            arrow: { placement: 'bottom-center' },
            paper: {
              onMouseEnter: hoverPopover.onOpen,
              onMouseLeave: hoverPopover.onClose,
              sx: { ...(hoverPopover.open && { pointerEvents: 'auto' }) },
            },
          }}
          sx={{ pointerEvents: 'none' }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Etiam feugiat lorem non metus
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
            </Typography>
          </Box>
        </CustomPopover>
      )}
    </>
  );

  const DEMO_COMPONENTS = [
    {
      name: 'Click & hover',
      component: (
        <ComponentBox>
          {renderClickPopover()}
          {renderHoverPopover()}
        </ComponentBox>
      ),
    },
    {
      name: 'Customized',
      component: (
        <ComponentBox sx={{ gap: 5, alignItems: 'flex-start' }}>
          <IconButton
            color={customizedPopover.open ? 'inherit' : 'default'}
            onClick={customizedPopover.onOpen}
            sx={{ bgcolor: 'action.hover' }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <FormControl>
            <FormLabel
              component="legend"
              id="arrow-position-radios"
              sx={{ mb: 1, typography: 'body2' }}
            >
              Arrow
            </FormLabel>
            <RadioGroup
              aria-labelledby="arrow-position-radios"
              value={arrow}
              onChange={handleChangePopoverArrow}
            >
              {[
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'left-top',
                'left-center',
                'left-bottom',
                'right-top',
                'right-center',
                'right-bottom',
              ].map((position) => (
                <FormControlLabel
                  key={position}
                  value={position}
                  control={<Radio />}
                  label={position}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <CustomPopover
            open={customizedPopover.open}
            onClose={customizedPopover.onClose}
            anchorEl={customizedPopover.anchorEl}
            slotProps={{ arrow: { placement: arrow } }}
          >
            <Box sx={{ p: 2, maxWidth: 280 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Etiam feugiat lorem non metus
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
              </Typography>
            </Box>
          </CustomPopover>
        </ComponentBox>
      ),
    },
  ];

  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Popover',
        moreLinks: ['https://mui.com/material-ui/react-popover/'],
      }}
    />
  );
}

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Menu from '@mui/material/Menu';
import { listClasses } from '@mui/material/List';
import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';

import { Iconify } from '../../iconify';
import { ToolbarItem } from './toolbar-item';

import type { EditorToolbarProps } from '../types';

// ----------------------------------------------------------------------

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_OPTIONS = [
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6',
];

export function HeadingBlock({ editor }: Pick<EditorToolbarProps, 'editor'>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonBase
        id="heading-menu-button"
        aria-label="Heading menu button"
        aria-controls={anchorEl ? 'heading-menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        sx={(theme) => ({
          px: 1,
          width: 120,
          height: 32,
          borderRadius: 0.75,
          typography: 'body2',
          justifyContent: 'space-between',
          border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        })}
      >
        {(editor.isActive('heading', { level: 1 }) && 'Heading 1') ||
          (editor.isActive('heading', { level: 2 }) && 'Heading 2') ||
          (editor.isActive('heading', { level: 3 }) && 'Heading 3') ||
          (editor.isActive('heading', { level: 4 }) && 'Heading 4') ||
          (editor.isActive('heading', { level: 5 }) && 'Heading 5') ||
          (editor.isActive('heading', { level: 6 }) && 'Heading 6') ||
          'Paragraph'}

        <Iconify
          width={16}
          icon={anchorEl ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        />
      </ButtonBase>

      <Menu
        id="heading-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'heading-button' }}
        slotProps={{
          paper: {
            sx: {
              width: 120,
              [`& .${listClasses.root}`]: { gap: 0.5, display: 'flex', flexDirection: 'column' },
              [`& .${buttonBaseClasses.root}`]: {
                px: 1,
                width: 1,
                height: 34,
                borderRadius: 0.75,
                justifyContent: 'flex-start',
                '&:hover': { backgroundColor: 'action.hover' },
              },
            },
          },
        }}
      >
        <ToolbarItem
          component="li"
          label="Paragraph"
          active={editor.isActive('paragraph')}
          onClick={() => {
            handleClose();
            editor.chain().focus().setParagraph().run();
          }}
        />

        {HEADING_OPTIONS.map((heading, index) => {
          const level = (index + 1) as HeadingLevel;

          return (
            <ToolbarItem
              aria-label={heading}
              component="li"
              key={heading}
              label={heading}
              active={editor.isActive('heading', { level })}
              onClick={() => {
                handleClose();
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              sx={{
                ...(heading !== 'Paragraph' && {
                  fontSize: 18 - index,
                  fontWeight: 'fontWeightBold',
                }),
              }}
            />
          );
        })}
      </Menu>
    </>
  );
}

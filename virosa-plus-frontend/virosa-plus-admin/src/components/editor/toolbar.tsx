import type { StackProps } from '@mui/material/Stack';
import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { editorClasses } from './classes';
import { LinkBlock } from './components/link-block';
import { ImageBlock } from './components/image-block';
import { ToolbarItem } from './components/toolbar-item';
import { HeadingBlock } from './components/heading-block';

import type { EditorToolbarProps } from './types';

// ----------------------------------------------------------------------

/**
 * Icons
 * https://remixicon.com
 */

export function Toolbar({
  sx,
  editor,
  fullItem,
  fullScreen,
  onToggleFullScreen,
  ...other
}: StackProps & EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const boxStyles: SxProps<Theme> = {
    gap: 0.5,
    display: 'flex',
  };

  return (
    <Stack
      className={editorClasses.toolbar.root}
      divider={<Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto' }} />}
      sx={[
        (theme) => ({
          gap: 1,
          p: 1.25,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
          borderBottom: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <HeadingBlock editor={editor} />

      {/* Text style */}
      <Box sx={{ ...boxStyles }}>
        <ToolbarItem
          aria-label="Bold"
          active={editor.isActive('bold')}
          className={editorClasses.toolbar.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={
            <path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z" />
          }
        />
        <ToolbarItem
          aria-label="Italic"
          active={editor.isActive('italic')}
          className={editorClasses.toolbar.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={<path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z" />}
        />
        <ToolbarItem
          aria-label="Underline"
          active={editor.isActive('underline')}
          className={editorClasses.toolbar.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={
            <path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z" />
          }
        />
        <ToolbarItem
          aria-label="Strike"
          active={editor.isActive('strike')}
          className={editorClasses.toolbar.italic}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          icon={
            <path d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z" />
          }
        />
      </Box>

      {/* List */}
      <Box sx={{ ...boxStyles }}>
        <ToolbarItem
          aria-label="Bullet list"
          active={editor.isActive('bulletList')}
          className={editorClasses.toolbar.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={
            <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
          }
        />
        <ToolbarItem
          aria-label="Ordered list"
          active={editor.isActive('orderedList')}
          className={editorClasses.toolbar.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={
            <path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z" />
          }
        />
      </Box>

      {/* Text align */}
      <Box sx={{ ...boxStyles }}>
        <ToolbarItem
          aria-label="Align left"
          active={editor.isActive({ textAlign: 'left' })}
          className={editorClasses.toolbar.alignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          icon={<path d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z" />}
        />
        <ToolbarItem
          aria-label="Align center"
          active={editor.isActive({ textAlign: 'center' })}
          className={editorClasses.toolbar.alignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          icon={<path d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z" />}
        />
        <ToolbarItem
          aria-label="Align right"
          active={editor.isActive({ textAlign: 'right' })}
          className={editorClasses.toolbar.alignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          icon={<path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z" />}
        />
        <ToolbarItem
          aria-label="Align justify"
          active={editor.isActive({ textAlign: 'justify' })}
          className={editorClasses.toolbar.alignJustify}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          icon={<path d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z" />}
        />
      </Box>

      {/* Code - Code block */}
      {fullItem && (
        <Box sx={{ ...boxStyles }}>
          <ToolbarItem
            aria-label="Align justify"
            active={editor.isActive('code')}
            className={editorClasses.toolbar.code}
            onClick={() => editor.chain().focus().toggleCode().run()}
            icon={
              <path d="M16.95 8.46448L18.3642 7.05026L23.3139 12L18.3642 16.9498L16.95 15.5355L20.4855 12L16.95 8.46448ZM7.05048 8.46448L3.51495 12L7.05048 15.5355L5.63627 16.9498L0.686523 12L5.63627 7.05026L7.05048 8.46448Z" />
            }
          />
          <ToolbarItem
            aria-label="Align justify"
            active={editor.isActive('codeBlock')}
            className={editorClasses.toolbar.codeBlock}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon={
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z" />
            }
          />
        </Box>
      )}

      {/* Blockquote - Hr line */}
      {fullItem && (
        <Box sx={{ ...boxStyles }}>
          <ToolbarItem
            aria-label="Blockquote"
            active={editor.isActive('blockquote')}
            className={editorClasses.toolbar.blockquote}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={
              <path d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z" />
            }
          />
          <ToolbarItem
            aria-label="Horizontal"
            className={editorClasses.toolbar.hr}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={<path d="M2 11H4V13H2V11ZM6 11H18V13H6V11ZM20 11H22V13H20V11Z" />}
          />
        </Box>
      )}

      {/* Link - Image */}
      <Box sx={{ ...boxStyles }}>
        <LinkBlock editor={editor} />
        <ImageBlock editor={editor} />
      </Box>

      {/* HardBreak - Clear */}
      <Box sx={{ ...boxStyles }}>
        <ToolbarItem
          aria-label="HardBreak"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={editorClasses.toolbar.hardbreak}
          icon={
            <path d="M15 18H16.5C17.8807 18 19 16.8807 19 15.5C19 14.1193 17.8807 13 16.5 13H3V11H16.5C18.9853 11 21 13.0147 21 15.5C21 17.9853 18.9853 20 16.5 20H15V22L11 19L15 16V18ZM3 4H21V6H3V4ZM9 18V20H3V18H9Z" />
          }
        />
        <ToolbarItem
          aria-label="Clear"
          className={editorClasses.toolbar.clear}
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          icon={
            <path d="M12.6512 14.0654L11.6047 20H9.57389L10.9247 12.339L3.51465 4.92892L4.92886 3.51471L20.4852 19.0711L19.071 20.4853L12.6512 14.0654ZM11.7727 7.53009L12.0425 5.99999H10.2426L8.24257 3.99999H19.9999V5.99999H14.0733L13.4991 9.25652L11.7727 7.53009Z" />
          }
        />
      </Box>

      {/* Undo - Redo */}
      {fullItem && (
        <Box sx={{ ...boxStyles }}>
          <ToolbarItem
            aria-label="Undo"
            className={editorClasses.toolbar.undo}
            disabled={!editor.can().chain().focus().undo().run()}
            onClick={() => editor.chain().focus().undo().run()}
            icon={
              <path d="M8 7V11L2 6L8 1V5H13C17.4183 5 21 8.58172 21 13C21 17.4183 17.4183 21 13 21H4V19H13C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7H8Z" />
            }
          />
          <ToolbarItem
            aria-label="Redo"
            className={editorClasses.toolbar.redo}
            disabled={!editor.can().chain().focus().redo().run()}
            onClick={() => editor.chain().focus().redo().run()}
            icon={
              <path d="M16 7H11C7.68629 7 5 9.68629 5 13C5 16.3137 7.68629 19 11 19H20V21H11C6.58172 21 3 17.4183 3 13C3 8.58172 6.58172 5 11 5H16V1L22 6L16 11V7Z" />
            }
          />
        </Box>
      )}

      <Box sx={{ ...boxStyles }}>
        <ToolbarItem
          aria-label="Fullscreen"
          active={fullScreen}
          className={editorClasses.toolbar.fullscreen}
          onClick={onToggleFullScreen}
          icon={
            fullScreen ? (
              <path d="M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z" />
            ) : (
              <path d="M16 3H22V9H20V5H16V3ZM2 3H8V5H4V9H2V3ZM20 19V15H22V21H16V19H20ZM4 19H8V21H2V15H4V19Z" />
            )
          }
        />
      </Box>
    </Stack>
  );
}

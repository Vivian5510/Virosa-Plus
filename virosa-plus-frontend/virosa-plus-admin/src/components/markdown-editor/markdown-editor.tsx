// 导入Crepe官方样式
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import type { Theme, SxProps } from '@mui/material/styles';

import { Crepe } from '@milkdown/crepe';
import { useRef, useEffect, forwardRef } from 'react';
import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react';

import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

export interface MarkdownEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  label?: string;
}

// Crepe编辑器组件
const CrepeEditor = ({ value = '', onChange }: MarkdownEditorProps) => {
  const crepeRef = useRef<Crepe | null>(null);
  const initialValueRef = useRef(value);

  // 使用useEditor初始化编辑器
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: value || '',
    });

    // 保存编辑器实例引用
    crepeRef.current = crepe;

    return crepe;
  });

  // 监听编辑器内容变化
  useEffect(() => {
    const crepe = crepeRef.current;
    if (!crepe || !onChange) return;

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver(() => {
      try {
        const content = crepe.getMarkdown();
        // 只有当内容真正变化时才触发onChange
        if (content !== initialValueRef.current && content !== value) {
          onChange(content);
        }
      } catch (error) {
        console.error('获取Markdown内容失败:', error);
      }
    });

    // 查找编辑器DOM元素
    const editorElement = document.querySelector('.milkdown');
    if (editorElement) {
      observer.observe(editorElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [onChange, value]);

  return <Milkdown />;
};

// 外部包装组件
export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  (
    {
      value = '',
      onChange,
      error,
      helperText,
      sx,
      disabled = false,
      placeholder = '请输入Markdown内容...',
    },
    ref
  ) => {
    const customStyle = {
      border: `1px solid ${error ? '#f44336' : '#e0e0e0'}`,
      borderRadius: '8px',
      padding: '8px',
      minHeight: '500px',
      height: 'auto',
      overflowY: 'auto' as const,
      backgroundColor: disabled ? '#f9f9f9' : '#ffffff',
      '&:focus-within': {
        borderColor: error ? '#f44336' : '#2196f3',
        boxShadow: `0 0 0 2px ${error ? 'rgba(244, 67, 54, 0.2)' : 'rgba(33, 150, 243, 0.2)'}`,
      },
      // 确保编辑器占满容器宽度
      '& .milkdown-container': {
        width: '100%',
        maxWidth: '100%',
      },
    };

    return (
      <Box
        sx={{
          ...sx,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
          m: 0,
          p: 0,
        }}
        ref={ref}
      >
        <Box sx={customStyle}>
          <MilkdownProvider>
            <CrepeEditor value={value} onChange={onChange} />
          </MilkdownProvider>
        </Box>

        {helperText && (
          <FormHelperText error={!!error} sx={{ px: 1, mt: 0.5 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }
);

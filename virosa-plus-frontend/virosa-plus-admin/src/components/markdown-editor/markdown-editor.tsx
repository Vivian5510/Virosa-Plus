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
            position: 'relative',
            background: disabled 
                ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' 
                : 'linear-gradient(135deg, #ffffff 0%, #f8f9fb 100%)',
            border: error 
                ? '2px solid transparent' 
                : '2px solid transparent',
            borderRadius: '16px',
            padding: '20px',
            minHeight: '500px',
            height: 'auto',
            overflowY: 'auto' as const,
            boxShadow: error
                ? '0 8px 32px rgba(244, 67, 54, 0.12), 0 2px 8px rgba(244, 67, 54, 0.08)'
                : '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 16px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            
            // 渐变边框效果
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                padding: '2px',
                background: error 
                    ? 'linear-gradient(135deg, #f44336, #e57373)'
                    : 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                borderRadius: '16px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                zIndex: -1,
            },
            
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: error
                    ? '0 12px 40px rgba(244, 67, 54, 0.16), 0 4px 16px rgba(244, 67, 54, 0.12)'
                    : '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(0, 0, 0, 0.08)',
                '&::before': {
                    background: error 
                        ? 'linear-gradient(135deg, #f44336, #e57373, #ffab91)'
                        : 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f6d365)',
                },
            },
            
            '&:focus-within': {
                transform: 'translateY(-3px)',
                boxShadow: error
                    ? '0 16px 48px rgba(244, 67, 54, 0.2), 0 6px 24px rgba(244, 67, 54, 0.16)'
                    : '0 16px 48px rgba(102, 126, 234, 0.15), 0 6px 24px rgba(118, 75, 162, 0.1)',
                '&::before': {
                    background: error 
                        ? 'linear-gradient(135deg, #f44336, #e57373, #ffab91)'
                        : 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f6d365)',
                    animationName: 'borderGlow',
                    animationDuration: '2s',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'ease-in-out',
                },
            },
            
            // 编辑器内容样式
            '& .milkdown': {
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#2d3748',
                fontSize: '16px',
                lineHeight: '1.7',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                minHeight: '200px',
                position: 'relative',
                
                // 空状态时的占位符效果
                '&:empty::before': {
                    content: `"${placeholder}"`,
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    color: 'rgba(102, 126, 234, 0.5)',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px dashed rgba(102, 126, 234, 0.3)',
                },
            },
            
            '& .milkdown-container': {
                width: '100%',
                maxWidth: '100%',
                background: 'transparent',
            },
            
            '& .milkdown-menu': {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                padding: '8px',
            },
            
            '& .milkdown-menu-item': {
                borderRadius: '8px',
                padding: '8px 12px',
                margin: '2px',
                transition: 'all 0.2s ease',
                '&:hover': {
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    transform: 'scale(1.05)',
                },
            },
            
            // 代码块样式美化
            '& .milkdown pre': {
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                overflow: 'auto',
            },
            
            '& .milkdown code': {
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                color: '#667eea',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.9em',
                fontWeight: '500',
            },
            
            // 引用块样式
            '& .milkdown blockquote': {
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                borderLeft: '4px solid #667eea',
                borderRadius: '0 12px 12px 0',
                padding: '16px 20px',
                margin: '16px 0',
                fontStyle: 'italic',
                position: 'relative',
                '&::before': {
                    content: '"❝"',
                    position: 'absolute',
                    top: '-5px',
                    left: '15px',
                    fontSize: '30px',
                    color: '#667eea',
                    opacity: 0.3,
                },
            },
            
            // 表格样式
            '& .milkdown table': {
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                '& th': {
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '12px 16px',
                    fontWeight: '600',
                },
                '& td': {
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                },
                '& tr:nth-of-type(even)': {
                    background: 'rgba(102, 126, 234, 0.02)',
                },
            },
            
            // 标题样式
            '& .milkdown h1, & .milkdown h2, & .milkdown h3': {
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: '700',
                marginTop: '24px',
                marginBottom: '16px',
            },
            
            // 链接样式
            '& .milkdown a': {
                color: '#667eea',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderBottom: '2px solid #667eea',
                    transform: 'translateY(-1px)',
                },
            },
            
            '@keyframes borderGlow': {
                '0%, 100%': {
                    background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f6d365)',
                },
                '50%': {
                    background: 'linear-gradient(135deg, #f6d365, #fda085, #667eea, #764ba2)',
                },
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
                    p: { xs: 1, sm: 2 },
                    position: 'relative',
                }}
                ref={ref}
            >
                <Box sx={customStyle}>
                    <MilkdownProvider>
                        <CrepeEditor value={value} onChange={onChange} />
                    </MilkdownProvider>
                </Box>

                {helperText && (
                    <FormHelperText 
                        error={!!error} 
                        sx={{ 
                            px: 2, 
                            mt: 1,
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            background: error 
                                ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.05), rgba(229, 115, 115, 0.05))'
                                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            border: error 
                                ? '1px solid rgba(244, 67, 54, 0.2)'
                                : '1px solid rgba(102, 126, 234, 0.2)',
                            color: error ? '#f44336' : '#667eea',
                        }}
                    >
                        {helperText}
                    </FormHelperText>
                )}
            </Box>
        );
    }
);

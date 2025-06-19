// 这个文件提供react-router-dom的垫片，以解决TypeScript错误
// 注意：这只是临时解决方案，正式环境应该安装真正的依赖

import React from 'react';
import { useNavigate as useReactNavigate, useLocation as useReactLocation } from 'react-router';

// 导出react-router的组件
export const Navigate = ({ to, replace, state }: { to: string, replace?: boolean, state?: any }) => {
    const navigate = useReactNavigate();

    React.useEffect(() => {
        navigate(to, { replace, state });
    }, [navigate, to, replace, state]);

    return null;
};

// 导出hooks
export const useNavigate = useReactNavigate;
export const useLocation = useReactLocation; 
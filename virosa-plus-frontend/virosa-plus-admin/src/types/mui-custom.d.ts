
import '@mui/x-data-grid';

// 扩展DataGrid的panel属性
declare module '@mui/x-data-grid' {
    interface GridPanelProps {
        anchorEl?: HTMLElement | null;
    }

    interface PanelPropsOverrides {
        anchorEl?: HTMLElement | null;
    }
}

// 解决TimelineItemProps问题
declare module '@mui/lab/TimelineItem' {
    export interface TimelineItemProps {
        lastItem?: boolean;
        item?: any;
    }
}

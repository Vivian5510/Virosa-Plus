
export interface ToastT {
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    autoHideDuration?: number;
    preventDuplicate?: boolean;
    persist?: boolean;
    id?: string | number;
    description?: string;
    closeButton?: boolean;
    action?: React.ReactNode;
}

export type ToastPromiseMessages<T = any> = {
    loading: string;
    success: string | ((result: T) => string);
    error: string | ((error: any) => string);
    closeButton?: boolean;
};

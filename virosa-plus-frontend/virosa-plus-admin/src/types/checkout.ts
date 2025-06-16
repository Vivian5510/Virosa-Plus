import type { IAddressItem } from './common';

// ----------------------------------------------------------------------

export type ICheckoutItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  coverUrl: string;
  colors: string[];
  quantity: number;
  available: number;
  subtotal?: number;
};

export type ICheckoutDeliveryOption = {
  label: string;
  value: number;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

export type ICheckoutState = {
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  totalItems: number;
  items: ICheckoutItem[];
  billing: IAddressItem | null;
};

export type CheckoutContextValue = {
  loading: boolean;
  completed: boolean;
  canReset: boolean;
  /********/
  state: ICheckoutState;
  setState: (updateValue: Partial<ICheckoutState>) => void;
  setField: (name: keyof ICheckoutState, updateValue: ICheckoutState[keyof ICheckoutState]) => void;
  /********/
  steps: string[];
  activeStep: number | null;
  onChangeStep: (type: 'back' | 'next' | 'go', step?: number) => void;
  /********/
  onChangeItemQuantity: (itemId: string, quantity: number) => void;
  /********/
  onResetCart: () => void;
  onAddToCart: (newItem: ICheckoutItem) => void;
  onDeleteCartItem: (itemId: string) => void;
  onApplyDiscount: (discount: number) => void;
  onApplyShipping: (discount: number) => void;
  onCreateBillingAddress: (address: IAddressItem) => void;
};

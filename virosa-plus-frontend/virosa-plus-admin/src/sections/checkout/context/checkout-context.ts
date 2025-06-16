import type { CheckoutContextValue } from 'src/types/checkout';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

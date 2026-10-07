import { createContext, useContext, useState, type ReactNode } from 'react';
import { useLivePrices, type LivePrice } from '@/hooks/useLivePrices';

export type Currency = 'USD' | 'INR';
export type TradingMode = 'live' | 'paper';

interface AppContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  tradingMode: TradingMode;
  setTradingMode: (m: TradingMode) => void;
  formatCurrency: (usd: number) => string;
  formatCompact: (usd: number) => string;
  convert: (usd: number) => number;
  livePrices: Record<string, LivePrice>;
  liveConnected: boolean;
}

const USD_TO_INR = 83.5;

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [tradingMode, setTradingMode] = useState<TradingMode>('paper');
  const { prices: livePrices, connected: liveConnected } = useLivePrices();

  const convert = (usd: number) => (currency === 'INR' ? usd * USD_TO_INR : usd);

  const formatCurrency = (usd: number) => {
    const val = convert(usd);
    if (currency === 'INR') {
      return '\u20B9' + val.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
    return '$' + val.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  const formatCompact = (usd: number) => {
    const val = convert(usd);
    if (currency === 'INR') {
      if (val >= 10000000) return '\u20B9' + (val / 10000000).toFixed(2) + 'Cr';
      if (val >= 100000) return '\u20B9' + (val / 100000).toFixed(2) + 'L';
      if (val >= 1000) return '\u20B9' + (val / 1000).toFixed(1) + 'K';
      return '\u20B9' + val.toFixed(0);
    }
    if (val >= 1_000_000) return '$' + (val / 1_000_000).toFixed(2) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'K';
    return '$' + val.toFixed(0);
  };

  return (
    <AppContext.Provider value={{ currency, setCurrency, tradingMode, setTradingMode, formatCurrency, formatCompact, convert, livePrices, liveConnected }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

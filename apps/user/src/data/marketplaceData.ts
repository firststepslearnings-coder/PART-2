export interface MasterBot {
  id: string;
  name: string;
  author: string;
  description: string;
  monthlyReturn: number;
  totalCopiers: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  winRate: number;
  accent: 'cyan' | 'green' | 'amber';
  badge?: string;
  strategy: string;
  market: 'Spot' | 'Futures' | 'Spot & Futures';
  maxDrawdown: number;
  followers: number;
  createdAgo: string;
  sparkline: number[];
}

function genSparkline(base: number, vol: number, trend: number): number[] {
  const arr: number[] = [];
  let val = base;
  for (let i = 0; i < 40; i++) {
    val += (Math.random() - 0.5 + trend) * vol;
    arr.push(Math.max(0, val));
  }
  return arr;
}

export const masterBots: MasterBot[] = [
  {
    id: 'mb1',
    name: 'Quantum Scalper',
    author: 'ProTrader_India',
    description: 'High-frequency scalping bot using SMC order blocks and liquidity zones. Optimized for BTC/USDT futures with tight stop losses.',
    monthlyReturn: 18.4,
    totalCopiers: 1247,
    riskLevel: 'High',
    winRate: 72,
    accent: 'cyan',
    badge: 'TOP EARNER',
    strategy: 'Scalping + SMC',
    market: 'Futures',
    maxDrawdown: 12,
    followers: 3892,
    createdAgo: '4 months ago',
    sparkline: genSparkline(10000, 600, 0.06),
  },
  {
    id: 'mb2',
    name: 'SMC Alpha',
    author: 'SmartMoney_AI',
    description: 'Smart Money Concept bot that detects institutional order flows, BOS, and CHoCH patterns. Auto-enters on confirmed breakouts.',
    monthlyReturn: 14.2,
    totalCopiers: 892,
    riskLevel: 'Medium',
    winRate: 68,
    accent: 'green',
    badge: 'VERIFIED',
    strategy: 'Smart Money Concept',
    market: 'Spot & Futures',
    maxDrawdown: 8,
    followers: 2140,
    createdAgo: '6 months ago',
    sparkline: genSparkline(10000, 400, 0.045),
  },
  {
    id: 'mb3',
    name: 'DCA Sentiment Bot',
    author: 'CryptoSage_IN',
    description: 'AI-powered DCA bot that buys dips based on Fear & Greed index and social sentiment. Perfect for long-term BTC/ETH accumulation.',
    monthlyReturn: 7.8,
    totalCopiers: 2103,
    riskLevel: 'Low',
    winRate: 82,
    accent: 'green',
    badge: 'POPULAR',
    strategy: 'DCA + Sentiment',
    market: 'Spot',
    maxDrawdown: 5,
    followers: 5631,
    createdAgo: '8 months ago',
    sparkline: genSparkline(10000, 250, 0.025),
  },
  {
    id: 'mb4',
    name: 'Grid Master Pro',
    author: 'GridKing',
    description: 'Dynamic grid trading bot that auto-adjusts grid spacing based on ATR volatility. Profits in sideways and ranging markets.',
    monthlyReturn: 11.5,
    totalCopiers: 654,
    riskLevel: 'Medium',
    winRate: 76,
    accent: 'amber',
    strategy: 'Grid + ATR',
    market: 'Spot & Futures',
    maxDrawdown: 9,
    followers: 1820,
    createdAgo: '5 months ago',
    sparkline: genSparkline(10000, 350, 0.035),
  },
  {
    id: 'mb5',
    name: 'Momentum Breakout AI',
    author: 'QuantLab',
    description: 'Detects pre-breakout consolidation patterns and enters on volume-confirmed breakouts. Uses VWAP and Market Structure.',
    monthlyReturn: 22.1,
    totalCopiers: 421,
    riskLevel: 'High',
    winRate: 64,
    accent: 'cyan',
    badge: 'RISING STAR',
    strategy: 'Momentum + Volume',
    market: 'Futures',
    maxDrawdown: 15,
    followers: 1108,
    createdAgo: '2 months ago',
    sparkline: genSparkline(10000, 800, 0.07),
  },
  {
    id: 'mb6',
    name: 'Safe Stack DCA',
    author: 'WealthBuilder',
    description: 'Conservative DCA bot with risk-adjusted position sizing. Ideal for beginners looking to accumulate crypto steadily in INR.',
    monthlyReturn: 5.2,
    totalCopiers: 3270,
    riskLevel: 'Low',
    winRate: 88,
    accent: 'green',
    badge: 'BEGINNER FRIENDLY',
    strategy: 'DCA + Risk-Adjusted',
    market: 'Spot',
    maxDrawdown: 3,
    followers: 7420,
    createdAgo: '1 year ago',
    sparkline: genSparkline(10000, 150, 0.018),
  },
  {
    id: 'mb7',
    name: 'Futures Sniper AI',
    author: 'SniperBot_IN',
    description: 'Leveraged futures bot with AI-driven entry timing. Uses multi-timeframe confluence: 1m entry, 15m trend, 1H bias.',
    monthlyReturn: 28.7,
    totalCopiers: 512,
    riskLevel: 'High',
    winRate: 61,
    accent: 'cyan',
    badge: 'HIGH YIELD',
    strategy: 'Futures + Multi-TF',
    market: 'Futures',
    maxDrawdown: 18,
    followers: 1530,
    createdAgo: '3 months ago',
    sparkline: genSparkline(10000, 1000, 0.09),
  },
  {
    id: 'mb8',
    name: 'Arbitrage Hunter',
    author: 'ArbMachine',
    description: 'Cross-exchange arbitrage bot that monitors price gaps between Binance, CoinDCX, and WazirX. Near-zero risk steady profits.',
    monthlyReturn: 3.8,
    totalCopiers: 1850,
    riskLevel: 'Low',
    winRate: 94,
    accent: 'amber',
    strategy: 'Arbitrage',
    market: 'Spot',
    maxDrawdown: 2,
    followers: 4210,
    createdAgo: '10 months ago',
    sparkline: genSparkline(10000, 100, 0.012),
  },
];

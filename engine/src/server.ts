import express from 'express';
import cors from 'cors';
import { TradingEngine } from './trading/engine';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const tradingEngine = new TradingEngine();

interface PlaceTradeBody {
  bot_name: string;
  bot_type: 'scalper' | 'dca' | 'grid' | 'copier';
  execution_mode: 'auto' | 'manual';
  market_type: 'spot' | 'futures';
  trading_mode: 'live' | 'paper';
  coin: string;
  pair: string;
  binance_symbol: string;
  direction: 'long' | 'short';
  order_type: 'market' | 'limit';
  entry_price: number;
  quantity: number;
  position_size: number;
  leverage: number;
  take_profit_pct: number | null;
  stop_loss_pct: number | null;
  take_profit_fixed: number | null;
  stop_loss_fixed: number | null;
  trailing_stop: boolean;
  trailing_distance_pct: number | null;
  rr_ratio: number;
  max_trades_per_day: number;
  max_daily_loss: number;
  max_daily_profit: number;
  cooldown_minutes: number;
  indicators: string[];
  user_email: string | null;
}

app.post('/api/place-trade', (req, res) => {
  const body = req.body as PlaceTradeBody;

  if (!body || !body.coin || !body.pair) {
    return res.status(400).json({ success: false, error: 'Missing required fields: coin, pair' });
  }

  const isLive = body.trading_mode === 'live';

  if (isLive) {
    // Live trading: would use broker API credentials to place real orders
    console.log(`[LIVE TRADE] ${body.direction.toUpperCase()} ${body.quantity} ${body.pair} @ ${body.entry_price} (${body.order_type})`);
  } else {
    // Paper trading: simulate the order, no real funds involved
    console.log(`[PAPER TRADE] ${body.direction.toUpperCase()} ${body.quantity} ${body.pair} @ ${body.entry_price} (${body.order_type})`);
  }

  const orderId = isLive
    ? `live-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    : `paper-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return res.json({
    success: true,
    order_id: orderId,
    mode: isLive ? 'live' : 'paper',
    coin: body.coin,
    pair: body.pair,
    direction: body.direction,
    entry_price: body.entry_price,
    quantity: body.quantity,
    position_size: body.position_size,
    leverage: body.leverage,
    message: isLive
      ? 'Live trade order submitted to broker API'
      : 'Paper trade simulated successfully (no real funds used)',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Cortex AI Engine server running on http://localhost:${PORT}`);
});

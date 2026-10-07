import { ExchangeType } from "../definition/crypto_type.js";
import type { CryptocurrencyExchangeListItemType } from "../definition/crypto_type.js";

const data: CryptocurrencyExchangeListItemType[] = [
  {
    name: "欧易 OKX",
    valid_name: "欧易",
    url: "https://www.okx.com/join/48817502",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: true,
    允许大陆KYC: true,
    TradingView: true,
    海外节点兼容性: "极好",
    基础合约手续费: {
      挂单: 0.02,
      吃单: 0.05,
    },
  },
  {
    name: "币安",
    url: "https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00ERNEBHOA",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: true,
    允许大陆KYC: true,
    TradingView: true,
    海外节点兼容性: "差",
    基础合约手续费: {
      挂单: 0.02,
      吃单: 0.05,
    },
  },
  {
    name: "MEXC",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: false,
    允许大陆KYC: false,
    TradingView: true,
    海外节点兼容性: "差",
    基础合约手续费: {
      挂单: 0.01,
      吃单: 0.04,
    },
  },
  {
    name: "Gate.io",
    valid_name: "gateio",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: false,
    允许大陆KYC: false,
    TradingView: true,
    海外节点兼容性: "一般",
    基础合约手续费: {
      挂单: 0.02,
      吃单: 0.05,
    },
  },
  {
    name: "bybit",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: false,
    允许大陆KYC: true,
    TradingView: true,
    海外节点兼容性: "差",
    基础合约手续费: {
      挂单: 0.02,
      吃单: 0.055,
    },
  },
  {
    name: "火币 htx",
    valid_name: "htx",
    url: "https://www.htx.com/invite/zh-cn/1f?invite_code=bwca9223",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: true,
    允许大陆KYC: true,
    TradingView: true,
    海外节点兼容性: "好",
    基础合约手续费: {
      挂单: 0.02,
      吃单: 0.05,
    },
  },
  {
    name: "hyperliquid",
    url: "https://app.hyperliquid.xyz/",
    exchange_type: ExchangeType.DEX,
    大陆支付方式: false,
    TradingView: true,
    海外节点兼容性: "极好",
    基础合约手续费: {
      挂单: 0.01,
      吃单: 0.035,
    },
  },
  {
    name: "bitget",
    url: "https://www.bitget.com/",
    exchange_type: ExchangeType.CEX,
    大陆支付方式: false,
    TradingView: true,
    海外节点兼容性: "一般",
    基础合约手续费: {
      挂单: 0.01,
      吃单: 0.035,
    },
  },
];

export default data;

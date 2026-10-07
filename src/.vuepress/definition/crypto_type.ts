// 存放加密货币交易所相关的类型

export enum ExchangeType {
  CEX = "CEX",
  DEX = "DEX",
}

export type CryptocurrencyExchangeListItemType = {
  name: string;
  url?: string;
  /**
   * 插槽唯一标识
   */
  valid_name?: string;
  exchange_type: ExchangeType;
  大陆支付方式: boolean;
  允许大陆KYC?: boolean;
  TradingView: boolean;
  海外节点兼容性: string;
  基础合约手续费: {
    挂单: number | null;
    吃单: number | null;
  };
};

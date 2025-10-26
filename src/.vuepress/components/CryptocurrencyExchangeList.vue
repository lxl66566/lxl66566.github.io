<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>
            <Explain explanation="CEX（中心化交易所 或 DEX（去中心化交易所）">类型</Explain>
          </th>
          <th>
            <Explain explanation="支持支付宝、微信、大陆银行卡中的任意一项">大陆支付方式?</Explain>
          </th>
          <th>
            <Explain explanation="使用大陆身份证可以通过身份验证">允许大陆KYC?</Explain>
          </th>
          <th>
            <Explain explanation="一个好用的看盘工具，必备">TradingView?</Explain>
          </th>
          <th>
            <Explain explanation="用户的海外 IP 地址支持。本人主要看重日本和香港节点的支持度">海外节点兼容性</Explain>
          </th>
          <th>
            <Explain explanation="挂单 ~ 吃单，这里记录的是没有任何交易量的新人手续费">基础合约手续费</Explain>
          </th>
        </tr>
      </thead>
      <tbody>
        <ExpandableListItem v-for="item in data" :expandable="useSlots()[item.valid_name ?? item.name] != undefined">
          <template #list-content>
            <td>
              <span v-if="!item.url">{{ item.name }}</span>
              <a v-else :href="item.url" target="_blank">{{ item.name }}</a>
            </td>
            <td>{{ item.exchange_type }}</td>
            <td>{{ boolToString(item.大陆支付方式) }}</td>
            <td>{{ boolToString(item.允许大陆KYC) }}</td>
            <td>{{ boolToString(item.TradingView) }}</td>
            <td>{{ item.海外节点兼容性 }}</td>
            <td>{{ (item.基础合约手续费.挂单 ?? "-") + "%" + " ~ " + (item.基础合约手续费.吃单 ?? "-") + "%" }}</td>
          </template>
          <template #expanded-content>
            <slot :name="item.valid_name ?? item.name"></slot>
          </template>
        </ExpandableListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import ExpandableListItem from "./ExpandableListItem.vue";
import Explain from "./Explain.vue";

enum ExchangeType {
  CEX = "CEX",
  DEX = "DEX",
}

type CryptocurrencyExchangeListItemType = {
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
  }
};
const boolToString = (bool: boolean | undefined) => {
  if (bool === undefined) {
    return "-";
  }
  return bool ? "✅" : "❌";
};

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
</script>

<style scoped lang="scss">
table {
  overflow: visible !important;
}

td {
  text-align: center;
  vertical-align: middle;
}
</style>

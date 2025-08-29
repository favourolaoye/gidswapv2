export interface Currency {
  name: string;
  logo: string;
  rate: number;
  symbol?: string;
  type?: "crypto" | "fiat";
}

export interface SwapFormProps {
  sendAmount: string;
  setSendAmount: (value: string) => void;
  sendCurrency: Currency;
  setSendCurrency: (currency: Currency) => void;
  receiveAmount: string;
  setReceiveAmount: (value: string) => void;
  receiveCurrency: Currency;
  setReceiveCurrency: (currency: Currency) => void;
  setShowModal: (value: boolean) => void;
  tab: string;
}

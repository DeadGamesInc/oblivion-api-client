import { Address } from './common'

export default interface PaymentToken {
  address: Address
  symbol: string
  coinGeckoKey: string
  price: number
}

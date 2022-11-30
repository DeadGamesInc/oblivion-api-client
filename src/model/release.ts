import BigNumber from 'bignumber.js'
import { Address } from './common'

export interface ReleaseBase {
  id: number
  owner: Address
  nft: Address
  paymentToken: Address
  price: BigNumber
  sales: number
  maxSales: number
  maxQuantity: number
  endDate: number
  discount: number
  whitelisted: boolean
  ended: boolean
  treasury: Record<Address, number>
}

export default interface Release extends ReleaseBase {
  usesReviveRug: boolean
  selectable: boolean
}

export interface Release1155 extends ReleaseBase {
  tokenId: number
}

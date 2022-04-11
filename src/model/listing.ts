import BigNumber from 'bignumber.js'
import { Address } from './common'

export enum PaymentMethod {
  Bnb,
  Bep20,
}

export enum SaleType {
  Direct,
  Offer,
  Both,
}

export enum SaleState {
  Open,
  Closed,
  Cancelled,
}

export interface Offer {
  id: number
  offeror: Address
  amount: BigNumber
  discount: BigNumber
  claimed: boolean
}

export interface Listing {
  id: number
  tokenId: number
  nft: Address
  owner: Address
  paymentMethod: PaymentMethod
  paymentToken: Address
  saleType: SaleType
  saleState: SaleState
  targetPrice: BigNumber
  minimumPrice: BigNumber
  graceEnd: number
  saleEnd: number
  createBlock: number
  closedBlock: number
  wasSold: boolean
}

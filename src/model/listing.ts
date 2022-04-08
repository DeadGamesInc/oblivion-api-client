import BigNumber from 'bignumber.js'
import { Nft } from './nft'

export enum PaymentMethod {
  Bnb,
  Bep20,
}

export interface PaymentInfo {
  address: string
  marketTax: BigNumber
  enabled: boolean
  created: boolean
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

export interface CloseDetails {
  tx: string
  block: BigNumber
  buyer: string
  amount: BigNumber
  paymentToken: string
  type: SaleType.Offer | SaleType.Direct
  state: SaleState
}

export interface Offer {
  id: number
  offeror: string
  amount: BigNumber
  discount: BigNumber
  claimed: boolean
}

export interface OfferList {
  [key: string]: Offer[]
}

export interface Listing {
  id: number
  nft: Nft
  owner: string
  paymentMethod: PaymentMethod
  paymentToken: PaymentInfo
  saleType: SaleType
  saleState: SaleState
  targetPrice: BigNumber
  saleEnd: BigNumber
  offers: OfferList
  closeDetails: CloseDetails
}

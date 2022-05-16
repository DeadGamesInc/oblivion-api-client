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
  paymentToken: Address
  offeror: Address
  amount: BigNumber
  discount: BigNumber
  claimed: boolean
}

export interface TopOffer extends Offer {
  version: number
  paymentToken: string
  createBlock: BigNumber
  endBlock: BigNumber
}

export interface Listing {
  id: number
  version: number
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
  saleEnd: BigNumber
  createBlock: number
  closedBlock: number
  topOffer: TopOffer | null
  wasSold: boolean
}

export interface ListingDto {
  id: number
  version: number
  paymentToken: string
  nft: Address
  targetPrice: BigNumber
  minimumPrice: string
  tokenId: number
  saleEnd: BigNumber
  paymentMethod: number
  saleType: number
  saleState: number
  topOfferToken: Address | null
  // topOfferAmount: BigNumber
  nftName: string | null
  nftCacheHighRes: string | null
}

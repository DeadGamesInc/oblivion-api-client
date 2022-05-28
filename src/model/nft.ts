import { Address } from './common'

export interface NftTokenAttribute {
  traitType: string
  value: any
}

export interface NftTokenMetadata {
  name: string
  description: string
  externalUrl: string
  image: string
  attributes: NftTokenAttribute[]
}

export interface NftToken {
  id: number
  uri: string
  metadata: NftTokenMetadata
}

export interface Nft {
  address: Address
  name: string
  symbol: string
  uri: string
  totalSupply: number
  cacheHighRes: string | null
  cacheLowRes: string | null
  metadata: NftTokenMetadata | null
}

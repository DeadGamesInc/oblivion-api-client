import BigNumber from 'bignumber.js'

export interface NftTokenAttribute {
  traitType: string
  value: any
}

export interface NftToken {
  id: BigNumber
  name: string
  description: string
  attributes: NftTokenAttribute[]
  image: string
  externalUrl: string
}

export interface NftCollectionInfo {
  id: number
  index: BigNumber
  inCollection: boolean
}

export interface Nft {
  name: string
  symbol: string
  address: string
  token: NftToken
  collectionInfo: NftCollectionInfo
}

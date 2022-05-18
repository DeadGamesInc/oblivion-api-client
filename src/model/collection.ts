import { Address } from './common'

export default interface Collection {
  id: number
  owner: Address
  treasury: Address
  royalties: number
  description: string
  image: string
  banner: string
  createBlock: number
  nfts: Address[]
}

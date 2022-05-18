import { Address } from './common'

export default interface Collection {
  id: number
  owner: Address
  treasury: Address
  royalties: number
  name: string
  description: string
  image: string
  banner: string
  createBlock: number
  nfts: Address[]
}

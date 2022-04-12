import BigNumber from 'bignumber.js'
import { Address } from './common'

export default interface Sale {
  /**
   * Sale id
   */
  id: number

  /**
   * Price as quantity of payment token
   */
  amount: BigNumber

  /**
   * Address of payment token
   */
  paymentToken: Address

  /**
   * Address of buyer
   */
  buyer: Address

  /**
   * Address of seller
   */
  seller: Address

  /**
   * Unix timestamp (seconds) of creation
   */
  createDate: number

  /**
   * Unix timestamp (seconds) of sale
   */
  saleDate: number
}

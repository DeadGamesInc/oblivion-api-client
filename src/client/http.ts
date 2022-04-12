import BigNumber from 'bignumber.js'

import { getApiBaseUrl } from 'config/http'
import OblivionAPI from 'model/api'
import { Listing, Offer } from 'model/listing'
import { HTTPAPICaller, getReturnUndefinedOn404Config } from 'utils/http'
import { Nft, NftToken } from '../model'
import Sale from '../model/sale'
import { DEFAULT_CLIENT_CONFIG, OblivionClientConfig } from './types'

interface OblivionHTTPClientConfig extends OblivionClientConfig {
  endpointOverride?: string
}

const join = (path: string, ...segments: any[]) => [path, ...segments].join('/')

interface RawListing extends Omit<Listing, 'minimumPrice' | 'targetPrice'> {
  minimumPrice: string
  targetPrice: string
}
const toListing = (rawListing: RawListing): Listing =>
  rawListing && {
    ...rawListing,
    targetPrice: new BigNumber(rawListing.targetPrice),
    minimumPrice: new BigNumber(rawListing.minimumPrice),
  }

interface RawOffer extends Omit<Offer, 'amount' | 'discount'> {
  amount: string
  discount: string
}
const toOffer = (rawOffer: RawOffer): Offer =>
  rawOffer && {
    ...rawOffer,
    amount: new BigNumber(rawOffer.amount),
    discount: new BigNumber(rawOffer.discount),
  }

interface RawSale extends Omit<Sale, 'amount' | 'createDate' | 'saleDate'> {
  amount: BigNumber
  createDate: string
  saleDate: string
}
const toSale = (rawSale: RawSale): Sale => ({
  ...rawSale,
  amount: new BigNumber(rawSale.amount),
  createDate: new Date(rawSale.createDate).valueOf(),
  saleDate: new Date(rawSale.saleDate).valueOf(),
})

interface RawNftToken extends Omit<NftToken, 'id'> {
  tokenId: number
}
const toNftToken = (rawToken: RawNftToken): NftToken =>
  rawToken && {
    ...rawToken,
    id: rawToken.tokenId,
  }

export default class OblivionHTTPClient implements OblivionAPI {
  private readonly http: HTTPAPICaller

  constructor(config: OblivionHTTPClientConfig = DEFAULT_CLIENT_CONFIG) {
    const { chainId, endpointOverride } = config

    this.http = new HTTPAPICaller(getApiBaseUrl(chainId, endpointOverride))
  }

  private callPluralApi = async <R, T>(api: string, resultMapper: (raw: R) => T): Promise<T[]> => {
    const results: R[] = await this.http.get(api)
    return resultMapper ? results.map(resultMapper) : (results as unknown as T[])
  }

  private callGetListingsApi = (api: string): Promise<Listing[]> => this.callPluralApi(api, toListing)

  getTotalListings(): Promise<number> {
    return this.http.get('getTotalListings')
  }

  getListings(): Promise<Listing[]> {
    return this.callGetListingsApi('getListings')
  }

  getOpenListings(): Promise<Listing[]> {
    return this.callGetListingsApi('getOpenListings')
  }

  getClosedListings(): Promise<Listing[]> {
    return this.callGetListingsApi('getClosedListings')
  }

  getSoldListings(): Promise<Listing[]> {
    return this.callGetListingsApi('getSoldListings')
  }

  getListingsByNft(nftContractAddress: string): Promise<Listing[]> {
    return this.callGetListingsApi(join('getListingsByNft', nftContractAddress))
  }

  getOpenListingsByNft(nftContractAddress: string): Promise<Listing[]> {
    return this.callGetListingsApi(`getOpenListingsByNft/${nftContractAddress}`)
  }

  async getListing(listingId: number): Promise<Listing | undefined> {
    const listing: RawListing = await this.http.get(join('getListing', listingId), getReturnUndefinedOn404Config())

    return toListing(listing)
  }

  getUserListings(walletAddress: string): Promise<Listing[]> {
    return this.callGetListingsApi(join('getUserListings', walletAddress))
  }

  getUserListingsWithOpenOffers(walletAddress: string): Promise<Listing[]> {
    return this.callGetListingsApi(join('getUserListingsWithOpenOffers', walletAddress))
  }

  getUserOpenListings(walletAddress: string): Promise<Listing[]> {
    return this.callGetListingsApi(join('getUserOpenListings', walletAddress))
  }

  private callGetOffersApi = (api: string): Promise<Offer[]> => this.callPluralApi(api, toOffer)

  async getOffer(listingId: number, paymentTokenAddress: string, offerId: number): Promise<Offer | undefined> {
    const offer: RawOffer = await this.http.get(
      join('getOffer', listingId, paymentTokenAddress, offerId),
      getReturnUndefinedOn404Config(),
    )

    return toOffer(offer)
  }

  getOffers(listingId: number): Promise<Offer[]> {
    return this.callGetOffersApi(join('getOffers', listingId))
  }

  getOpenOffers(listingId: number): Promise<Offer[]> {
    return this.callGetOffersApi(join('getOpenOffers', listingId))
  }

  getTotalOffers(listingId: number): Promise<number> {
    return this.http.get(join('getTotalOffers', listingId))
  }

  async getSales(): Promise<Sale[]> {
    const sales: RawSale[] = await this.http.get('getSales')
    return sales.map(toSale)
  }

  getNft(nftContractAddress: string): Promise<Nft | undefined> {
    return this.http.get(join('getNft', nftContractAddress), getReturnUndefinedOn404Config())
  }

  async getNftToken(nftContractAddress: string, tokenId: number): Promise<NftToken | undefined> {
    const token: RawNftToken = await this.http.get(
      join('getNftTokenURI', nftContractAddress, tokenId),
      getReturnUndefinedOn404Config(),
    )

    return toNftToken(token)
  }

  async getNftTokens(nftContractAddress: string, tokenIds: number[]): Promise<NftToken[]> {
    const tokens: RawNftToken[] = await this.http.post(join('getNftTokenURIs', nftContractAddress), tokenIds)
    return tokens.map(toNftToken)
  }
}

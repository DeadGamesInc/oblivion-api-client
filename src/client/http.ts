import BigNumber from 'bignumber.js'

import { getApiBaseUrl } from '../config/http'
import OblivionAPI from '../model/api'
import { Listing, Offer, Nft, NftToken, TopOffer, ListingDto, SaleInformation } from '../model'
import { HTTPAPICaller, getReturnUndefinedOn404Config } from '../utils/http'
import Collection from '../model/collection'
import PaymentToken from '../model/paymentToken'
import Release from '../model/release'
import Sale from '../model/sale'
import { DEFAULT_CLIENT_CONFIG, OblivionClientConfig } from './types'
import VolumeReport from "../model/volumeReport";

interface OblivionHTTPClientConfig extends OblivionClientConfig {
  endpointOverride?: string
}

const join = (path: string, ...segments: any[]) => [path, ...segments].join('/')

interface RawTopOffer extends Omit<TopOffer, 'amount' | 'discount' | 'createBlock' | 'endBlock'> {
  amount: string
  discount: string
  createBlock: string
  endBlock: string
}

interface RawSaleInformation extends Omit<SaleInformation, 'amount'> {
  amount: string
}

interface RawListing extends Omit<Listing, 'minimumPrice' | 'targetPrice' | 'saleEnd' | 'topOffer' | 'saleInformation'> {
  minimumPrice: string
  targetPrice: string
  saleEnd: string
  topOffer: RawTopOffer | null
  saleInformation: RawSaleInformation | null
}

interface RawListingDto extends Omit<ListingDto, 'targetPrice' | 'saleEnd' | 'topOfferAmount'> {
  targetPrice: string
  saleEnd: string
  topOfferAmount: string | null
}

const toListing = (rawListing: RawListing): Listing =>
  rawListing && {
    ...rawListing,
    targetPrice: new BigNumber(rawListing.targetPrice),
    minimumPrice: new BigNumber(rawListing.minimumPrice),
    saleEnd: new BigNumber(rawListing.saleEnd),
    topOffer: rawListing.topOffer ? {
      ...rawListing.topOffer,
      amount: new BigNumber(rawListing.topOffer.amount),
      discount: new BigNumber(rawListing.topOffer.discount),
      createBlock: new BigNumber(rawListing.topOffer.createBlock),
      endBlock: new BigNumber(rawListing.topOffer.endBlock),
    } : null,
    saleInformation: rawListing.saleInformation ? {
      ...rawListing.saleInformation,
      amount: new BigNumber(rawListing.saleInformation.amount)
    } : null
  }

const toListingDto = (rawListing: RawListingDto): ListingDto =>
  rawListing && {
    ...rawListing,
    targetPrice: new BigNumber(rawListing.targetPrice),
    saleEnd: new BigNumber(rawListing.saleEnd),
    topOfferAmount: rawListing.topOfferAmount ? new BigNumber(rawListing.topOfferAmount) : null
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

interface RawRelease extends Omit<Release, 'price' | 'endDate'> {
  price: number
  endDate: string
  treasuryAddresses: string[]
  treasuryAllocations: number[]
}

const toRelease = (rawRelease: RawRelease): Release =>
  rawRelease && {
    ...rawRelease,
    price: new BigNumber(rawRelease.price),
    endDate: parseInt(rawRelease.endDate),
    treasury: Object.fromEntries(
      rawRelease.treasuryAddresses.map((address, i) => [address, rawRelease.treasuryAllocations[i]]),
    ),
  }

export default class OblivionHTTPClient implements OblivionAPI {
  private readonly http: HTTPAPICaller

  constructor(config: OblivionHTTPClientConfig = DEFAULT_CLIENT_CONFIG) {
    const { chainId, endpointOverride } = config

    this.http = new HTTPAPICaller(getApiBaseUrl(chainId, endpointOverride))
  }

  private callPluralApi = async <R, T>(api: string, resultMapper?: (raw: R) => T): Promise<T[]> => {
    const results: R[] = await this.http.get(api)
    return resultMapper ? results.map(resultMapper) : (results as unknown as T[])
  }

  private callGetListingsApi = (api: string): Promise<ListingDto[]> => this.callPluralApi(api, toListingDto)

  getTotalListings(): Promise<number> {
    return this.http.get('getTotalListings')
  }

  getListings(): Promise<ListingDto[]> {
    return this.callGetListingsApi('getListings')
  }

  getOpenListings(): Promise<ListingDto[]> {
    return this.callGetListingsApi('getOpenListings')
  }

  getClosedListings(): Promise<ListingDto[]> {
    return this.callGetListingsApi('getClosedListings')
  }

  getSoldListings(): Promise<ListingDto[]> {
    return this.callGetListingsApi('getSoldListings')
  }

  getListingsByNft(nftContractAddress: string): Promise<ListingDto[]> {
    return this.callGetListingsApi(join('getListingsByNft', nftContractAddress))
  }

  getOpenListingsByNft(nftContractAddress: string): Promise<ListingDto[]> {
    return this.callGetListingsApi(`getOpenListingsByNft/${nftContractAddress}`)
  }

  async getListing(version: number, listingId: number): Promise<Listing | undefined> {
    const listing: RawListing = await this.http.get(join('getListing', version, listingId), getReturnUndefinedOn404Config())
    return toListing(listing)
  }

  async refreshListing(version: number, listingId: number): Promise<Listing | undefined> {
    const listing: RawListing = await this.http.get(join('refreshListing', version, listingId), getReturnUndefinedOn404Config())
    return toListing(listing)
  }

  getUserListings(walletAddress: string): Promise<ListingDto[]> {
    return this.callGetListingsApi(join('getUserListings', walletAddress))
  }

  getUserListingsWithOpenOffers(walletAddress: string): Promise<ListingDto[]> {
    return this.callGetListingsApi(join('getUserListingsWithOpenOffers', walletAddress))
  }

  getUserOpenListings(walletAddress: string): Promise<ListingDto[]> {
    return this.callGetListingsApi(join('getUserOpenListings', walletAddress))
  }

  private callGetOffersApi = (api: string): Promise<Offer[]> => this.callPluralApi(api, toOffer)

  async getOffer(version: number, listingId: number, paymentTokenAddress: string, offerId: number): Promise<Offer | undefined> {
    const offer: RawOffer = await this.http.get(
      join('getOffer', version, listingId, paymentTokenAddress, offerId),
      getReturnUndefinedOn404Config(),
    )

    return toOffer(offer)
  }

  async refreshOffer(version: number, listingId: number, paymentTokenAddress: string, offerId: number): Promise<Offer | undefined> {
    const offer: RawOffer = await this.http.get(
      join('refreshOffer', version, listingId, paymentTokenAddress, offerId),
      getReturnUndefinedOn404Config(),
    )

    return toOffer(offer)
  }

  getOffers(version: number, listingId: number): Promise<Offer[]> {
    return this.callGetOffersApi(join('getOffers', version, listingId))
  }

  getUserOffers(address: string): Promise<Offer[]> {
    return this.callGetOffersApi(join('getUserOffers', address))
  }

  getOpenOffers(version: number, listingId: number): Promise<Offer[]> {
    return this.callGetOffersApi(join('getOpenOffers', version, listingId))
  }

  getTotalOffers(version: number, listingId: number): Promise<number> {
    return this.http.get(join('getTotalOffers', version, listingId))
  }

  async getSales(): Promise<Sale[]> {
    const sales: RawSale[] = await this.http.get('getSales')
    return sales.map(toSale)
  }

  getNft(nftContractAddress: string): Promise<Nft | undefined> {
    return this.http.get(join('getNft', nftContractAddress), getReturnUndefinedOn404Config())
  }

  getNfts(): Promise<Nft[]> {
    return this.http.get('getNfts', getReturnUndefinedOn404Config())
  }

  getNftsByAddress(addresses: string[]): Promise<Nft[]> {
    return this.http.post('getNftsByAddress', addresses, getReturnUndefinedOn404Config())
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

  getTotalCollections(): Promise<number> {
    return this.http.get('getTotalCollections')
  }

  getCollections(): Promise<Collection[]> {
    return this.callPluralApi('getCollections')
  }

  getUserCollections(address: string): Promise<Collection[]> {
    return this.callPluralApi(join('getCollections', address))
  }

  getCollection(collectionId: number): Promise<Collection | undefined> {
    return this.http.get(join('getCollection', collectionId), getReturnUndefinedOn404Config())
  }

  refreshCollection(collectionId: number): Promise<Collection | undefined> {
    return this.http.get(join('refreshCollection', collectionId), getReturnUndefinedOn404Config())
  }

  getTotalReleases(): Promise<number> {
    return this.http.get('getTotalReleases')
  }

  getReleases(): Promise<Release[]> {
    return this.callPluralApi('getReleases', toRelease)
  }

  getUserReleases(address: string): Promise<Release[]> {
    return this.callPluralApi(join('getReleases', address), toRelease)
  }

  async getRelease(releaseId: number): Promise<Release | undefined> {
    const release: RawRelease = await this.http.get(join('getRelease', releaseId), getReturnUndefinedOn404Config())
    return toRelease(release)
  }

  async refreshRelease(releaseId: number): Promise<Release | undefined> {
    const release: RawRelease = await this.http.get(join('refreshRelease', releaseId), getReturnUndefinedOn404Config())
    return toRelease(release)
  }

  getPaymentTokens(): Promise<PaymentToken[]> {
    return this.callPluralApi('getPaymentTokens')
  }

  get24HourVolume(): Promise<VolumeReport> {
    return this.http.get('get24HourVolume')
  }
}

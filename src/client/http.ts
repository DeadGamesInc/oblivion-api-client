import getHttpEndpointForChain from 'config'
import OblivionAPI from 'model/api'
import { Listing, Offer, OfferList } from 'model/listing'
import HTTPAPICaller from 'utils/http'
import { DEFAULT_CLIENT_CONFIG, OblivionClientConfig } from './types'

interface OblivionHTTPClientConfig extends OblivionClientConfig {
  endpointOverride?: string
}

const join = (path: string, ...segments: any[]) => [path, ...segments].join('/')

export default class OblivionHTTPClient implements OblivionAPI {
  private readonly http: HTTPAPICaller

  constructor(config: OblivionHTTPClientConfig = DEFAULT_CLIENT_CONFIG) {
    const { chainId, endpointOverride } = config

    let endpoint = endpointOverride
    if (!endpoint) {
      endpoint = getHttpEndpointForChain(chainId)
    }

    this.http = new HTTPAPICaller(endpoint)
  }

  getTotalListings(): Promise<number> {
    return this.http.get('getTotalListings')
  }

  getListings(): Promise<Listing[]> {
    return this.http.get('getListings')
  }

  getOpenListings(): Promise<Listing[]> {
    return this.http.get('getOpenListings')
  }

  getClosedListings(): Promise<Listing[]> {
    return this.http.get('getClosedListings')
  }

  getListingsByNft(nftContractAddress: string): Promise<Listing[]> {
    return this.http.get(join('getListingsByNft', nftContractAddress))
  }

  getOpenListingsByNft(nftContractAddress: string): Promise<Listing[]> {
    return this.http.get(`getOpenListingsByNft/${nftContractAddress}`)
  }

  getListing(listingId: number): Promise<Listing | undefined> {
    return this.http.get(join('getListing', listingId))
  }

  getUserListings(walletAddress: string): Promise<Listing[]> {
    return this.http.get(join('getUserListings', walletAddress))
  }

  getUserListingsWithOpenOffers(walletAddress: string): Promise<Listing[]> {
    return this.http.get(join('getUserListingsWithOpenOffers', walletAddress))
  }

  getUserOpenListings(walletAddress: string): Promise<Listing[]> {
    return this.http.get(join('getUserOpenListings', walletAddress))
  }

  getOffer(listingId: number, paymentTokenAddress: string, offerId: number): Promise<Offer | undefined> {
    return this.http.get(join('getOffer', listingId, paymentTokenAddress, offerId))
  }

  getOffers(listingId: number): Promise<OfferList> {
    return this.http.get(join('getOffers', listingId))
  }

  getOpenOffers(listingId: number): Promise<OfferList> {
    return this.http.get(join('getOpenOffers', listingId))
  }

  getSoldListings(): Promise<Listing[]> {
    return this.http.get('getSoldListings')
  }

  getTotalOffers(listingId: number): Promise<number> {
    return this.http.get(join('getTotalOffers', listingId))
  }
}

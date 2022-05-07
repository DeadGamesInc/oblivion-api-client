import Collection from './collection'
import { Listing, Offer } from './listing'
import { Nft, NftToken } from './nft'
import PaymentToken from './paymentToken'
import Release from './release'
import Sale from './sale'
import VolumeReport from "./volumeReport";

export interface OblivionListingAPI {
  getTotalListings: () => Promise<number>
  getListings: () => Promise<Listing[]>
  getOpenListings: () => Promise<Listing[]>
  getClosedListings: () => Promise<Listing[]>
  getSoldListings: () => Promise<Listing[]>
  getListingsByNft: (nftContractAddress: string) => Promise<Listing[]>
  getOpenListingsByNft: (nftContractAddress: string) => Promise<Listing[]>
  getUserListings: (walletAddress: string) => Promise<Listing[]>
  getUserListingsWithOpenOffers: (walletAddress: string) => Promise<Listing[]>
  getUserOpenListings: (walletAddress: string) => Promise<Listing[]>
  getListing: (version: number, listingId: number) => Promise<Listing | undefined>
  getTotalOffers: (version: number, listingId: number) => Promise<number>
  getOffers: (version: number, listingId: number) => Promise<Offer[]>
  getOpenOffers: (version, listingId: number) => Promise<Offer[]>
  getOffer: (version: number, listingId: number, paymentTokenAddress: string, offerId: number) => Promise<Offer | undefined>
}

export interface OblivionSalesAPI {
  getSales: () => Promise<Sale[]>
}

export interface OblivionNftAPI {
  getNft: (nftContractAddress: string) => Promise<Nft | undefined>
  getNftToken: (nftContractAddress: string, tokenId: number) => Promise<NftToken | undefined>
  getNftTokens: (nftContractAddress: string, tokenIds: number[]) => Promise<NftToken[]>
}

export interface OblivionCollectionAPI {
  getTotalCollections: () => Promise<number>
  getCollections: () => Promise<Collection[]>
  getCollection: (collectionId: number) => Promise<Collection | undefined>
}

export interface OblivionReleaseAPI {
  getTotalReleases: () => Promise<number>
  getReleases: () => Promise<Release[]>
  getRelease: (releaseId: number) => Promise<Release | undefined>
}

export interface OblivionPaymentTokenAPI {
  getPaymentTokens: () => Promise<PaymentToken[]>
}

export interface OblivionVolumeAPI {
  get24HourVolume: () => Promise<VolumeReport>
}

export default interface OblivionAPI
  extends OblivionListingAPI,
    OblivionSalesAPI,
    OblivionNftAPI,
    OblivionReleaseAPI,
    OblivionPaymentTokenAPI,
    OblivionCollectionAPI,
    OblivionVolumeAPI {}

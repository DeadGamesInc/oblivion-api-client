import Collection from './collection'
import { Listing, ListingDto, Offer } from './listing'
import { Nft, NftToken } from './nft'
import PaymentToken from './paymentToken'
import Release, { Release1155 } from './release'
import Sale from './sale'
import VolumeReport from "./volumeReport";

export interface OblivionListingAPI {
  getTotalListings: () => Promise<number>
  getListings: () => Promise<ListingDto[]>
  getOpenListings: () => Promise<ListingDto[]>
  getClosedListings: () => Promise<ListingDto[]>
  getSoldListings: () => Promise<ListingDto[]>
  getListingsByNft: (nftContractAddress: string) => Promise<ListingDto[]>
  getOpenListingsByNft: (nftContractAddress: string) => Promise<ListingDto[]>
  getUserListings: (walletAddress: string) => Promise<ListingDto[]>
  getUserListingsWithOpenOffers: (walletAddress: string) => Promise<ListingDto[]>
  getUserOpenListings: (walletAddress: string) => Promise<ListingDto[]>
  getListing: (version: number, listingId: number) => Promise<Listing | undefined>
  refreshListing: (version: number, listingId: number) => Promise<Listing | undefined>
  getTotalOffers: (version: number, listingId: number) => Promise<number>
  getOffers: (version: number, listingId: number) => Promise<Offer[]>
  getUserOffers: (address: string) => Promise<Offer[]>
  getOpenOffers: (version, listingId: number) => Promise<Offer[]>
  getOffer: (version: number, listingId: number, paymentTokenAddress: string, offerId: number) => Promise<Offer | undefined>
  refreshOffer: (version: number, listingId: number, paymentTokenAddress: string, offerId: number) => Promise<Offer | undefined>
}

export interface OblivionSalesAPI {
  getSales: () => Promise<Sale[]>
}

export interface OblivionNftAPI {
  getNft: (nftContractAddress: string) => Promise<Nft | undefined>
  getNfts: () => Promise<Nft[]>
  getNftsByAddress: (addresses: string[]) => Promise<Nft[]>
  getNftToken: (nftContractAddress: string, tokenId: number) => Promise<NftToken | undefined>
  getNftTokens: (nftContractAddress: string, tokenIds: number[]) => Promise<NftToken[]>
}

export interface OblivionCollectionAPI {
  getTotalCollections: () => Promise<number>
  getCollections: () => Promise<Collection[]>
  getUserCollections: (address: string) => Promise<Collection[]>
  getCollection: (collectionId: number) => Promise<Collection | undefined>
  refreshCollection: (collectionId: number) => Promise<Collection | undefined>
}

export interface OblivionReleaseAPI {
  getTotalReleases: () => Promise<number>
  getReleases: () => Promise<Release[]>
  getReleases1155: () => Promise<Release1155[]>
  getUserReleases: (address: string) => Promise<Release[]>
  getRelease: (releaseId: number) => Promise<Release | undefined>
  getRelease1155: (releaseId: number) => Promise<Release1155 | undefined>
  refreshRelease1155: (releaseId: number) => Promise<Release1155 | undefined>
  refreshRelease: (releaseId: number) => Promise<Release | undefined>
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

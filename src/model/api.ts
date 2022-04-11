import { Listing, Offer } from './listing'

export default interface OblivionAPI {
  // Listings
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
  getListing: (listingId: number) => Promise<Listing | undefined>
  getTotalOffers: (listingId: number) => Promise<number>
  getOffers: (listingId: number) => Promise<Offer[]>
  getOpenOffers: (listingId: number) => Promise<Offer[]>
  getOffer: (listingId: number, paymentTokenAddress: string, offerId: number) => Promise<Offer | undefined>
}

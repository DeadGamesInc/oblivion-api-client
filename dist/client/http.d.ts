import OblivionAPI from '../model/api';
import { Listing, Offer, Nft, NftToken, ListingDto } from '../model';
import Collection from '../model/collection';
import PaymentToken from '../model/paymentToken';
import Release from '../model/release';
import Sale from '../model/sale';
import { OblivionClientConfig } from './types';
import VolumeReport from "../model/volumeReport";
interface OblivionHTTPClientConfig extends OblivionClientConfig {
    endpointOverride?: string;
}
export default class OblivionHTTPClient implements OblivionAPI {
    private readonly http;
    constructor(config?: OblivionHTTPClientConfig);
    private callPluralApi;
    private callGetListingsApi;
    getTotalListings(): Promise<number>;
    getListings(): Promise<ListingDto[]>;
    getOpenListings(): Promise<ListingDto[]>;
    getClosedListings(): Promise<ListingDto[]>;
    getSoldListings(): Promise<ListingDto[]>;
    getListingsByNft(nftContractAddress: string): Promise<ListingDto[]>;
    getOpenListingsByNft(nftContractAddress: string): Promise<ListingDto[]>;
    getListing(version: number, listingId: number): Promise<Listing | undefined>;
    getUserListings(walletAddress: string): Promise<ListingDto[]>;
    getUserListingsWithOpenOffers(walletAddress: string): Promise<ListingDto[]>;
    getUserOpenListings(walletAddress: string): Promise<ListingDto[]>;
    private callGetOffersApi;
    getOffer(version: number, listingId: number, paymentTokenAddress: string, offerId: number): Promise<Offer | undefined>;
    getOffers(version: number, listingId: number): Promise<Offer[]>;
    getOpenOffers(version: number, listingId: number): Promise<Offer[]>;
    getTotalOffers(version: number, listingId: number): Promise<number>;
    getSales(): Promise<Sale[]>;
    getNft(nftContractAddress: string): Promise<Nft | undefined>;
    getNftToken(nftContractAddress: string, tokenId: number): Promise<NftToken | undefined>;
    getNftTokens(nftContractAddress: string, tokenIds: number[]): Promise<NftToken[]>;
    getTotalCollections(): Promise<number>;
    getCollections(): Promise<Collection[]>;
    getCollection(collectionId: number): Promise<Collection | undefined>;
    getTotalReleases(): Promise<number>;
    getReleases(): Promise<Release[]>;
    getRelease(releaseId: number): Promise<Release | undefined>;
    getPaymentTokens(): Promise<PaymentToken[]>;
    get24HourVolume(): Promise<VolumeReport>;
}
export {};

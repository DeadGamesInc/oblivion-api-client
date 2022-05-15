import BigNumber from 'bignumber.js';
import { Address } from './common';
export declare enum PaymentMethod {
    Bnb = 0,
    Bep20 = 1
}
export declare enum SaleType {
    Direct = 0,
    Offer = 1,
    Both = 2
}
export declare enum SaleState {
    Open = 0,
    Closed = 1,
    Cancelled = 2
}
export interface Offer {
    id: number;
    offeror: Address;
    amount: BigNumber;
    discount: BigNumber;
    claimed: boolean;
}
export interface TopOffer extends Offer {
    version: number;
    paymentToken: string;
    createBlock: BigNumber;
    endBlock: BigNumber;
}
export interface Listing {
    id: number;
    version: number;
    tokenId: number;
    nft: Address;
    owner: Address;
    paymentMethod: PaymentMethod;
    paymentToken: Address;
    saleType: SaleType;
    saleState: SaleState;
    targetPrice: BigNumber;
    minimumPrice: BigNumber;
    graceEnd: number;
    saleEnd: BigNumber;
    createBlock: number;
    closedBlock: number;
    topOffer: TopOffer | null;
    wasSold: boolean;
}
export interface ListingDto {
    id: number;
    version: number;
    paymentToken: string;
    nft: string;
    targetPrice: BigNumber;
    minimumPrice: string;
    tokenId: number;
    saleEnd: BigNumber;
    paymentMethod: number;
    saleType: number;
    saleState: number;
    topOfferToken: string | null;
    topOfferAmount: BigNumber | null;
    nftName: string | null;
    nftCacheLowRes: string | null;
}

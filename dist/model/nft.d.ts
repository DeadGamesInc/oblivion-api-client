import { Address } from './common';
export interface NftTokenAttribute {
    traitType: string;
    value: any;
}
export interface NftTokenMetadata {
    name: string;
    description: string;
    externalUrl: string;
    image: string;
    attributes: NftTokenAttribute[];
}
export interface NftToken {
    id: number;
    uri: string;
    metadata: NftTokenMetadata;
}
export interface NftCollectionInfo {
    id: number;
    index: number;
    inCollection: boolean;
}
export interface Nft {
    address: Address;
    name: string;
    symbol: string;
    uri: string;
    metadata?: NftTokenMetadata;
}

import { Address } from './common';
export default interface Collection {
    id: number;
    owner: Address;
    treasury: Address;
    royalties: number;
    createBlock: number;
    nfts: Address[];
}

import BigNumber from 'bignumber.js';
import { Address } from './common';
export default interface Release {
    id: number;
    owner: Address;
    nft: Address;
    paymentToken: Address;
    price: BigNumber;
    sales: number;
    maxSales: number;
    maxQuantity: number;
    endDate: number;
    discount: number;
    selectable: boolean;
    whitelisted: boolean;
    ended: boolean;
    usesReviveRug: boolean;
    treasury: Record<Address, number>;
}

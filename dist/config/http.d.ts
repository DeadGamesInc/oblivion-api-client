import { ChainId } from '../model';
export declare const getApiEndpoint: (chainId: ChainId) => string;
export declare const getApiBasePath: (chainId: ChainId) => string;
export declare const getApiBaseUrl: (chainId: ChainId, endpoint?: string | undefined) => string;

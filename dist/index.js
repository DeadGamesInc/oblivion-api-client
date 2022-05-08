import { OblivionHTTPClient } from './client';
import { ChainId } from './model/chain';
export * from './model';
var oblivion = function (config) {
    if (config === void 0) { config = { chainId: ChainId.BSC }; }
    return new OblivionHTTPClient(config);
};
export default oblivion;

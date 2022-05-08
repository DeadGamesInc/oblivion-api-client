var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import BigNumber from 'bignumber.js';
import { getApiBaseUrl } from '../config/http';
import { HTTPAPICaller, getReturnUndefinedOn404Config } from '../utils/http';
import { DEFAULT_CLIENT_CONFIG } from './types';
var join = function (path) {
    var segments = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        segments[_i - 1] = arguments[_i];
    }
    return __spreadArray([path], segments, true).join('/');
};
var toListing = function (rawListing) {
    return rawListing && __assign(__assign({}, rawListing), { targetPrice: new BigNumber(rawListing.targetPrice), minimumPrice: new BigNumber(rawListing.minimumPrice), saleEnd: new BigNumber(rawListing.saleEnd) });
};
var toOffer = function (rawOffer) {
    return rawOffer && __assign(__assign({}, rawOffer), { amount: new BigNumber(rawOffer.amount), discount: new BigNumber(rawOffer.discount) });
};
var toSale = function (rawSale) { return (__assign(__assign({}, rawSale), { amount: new BigNumber(rawSale.amount), createDate: new Date(rawSale.createDate).valueOf(), saleDate: new Date(rawSale.saleDate).valueOf() })); };
var toNftToken = function (rawToken) {
    return rawToken && __assign(__assign({}, rawToken), { id: rawToken.tokenId });
};
var toRelease = function (rawRelease) {
    return rawRelease && __assign(__assign({}, rawRelease), { price: new BigNumber(rawRelease.price), endDate: parseInt(rawRelease.endDate), treasury: Object.fromEntries(rawRelease.treasuryAddresses.map(function (address, i) { return [address, rawRelease.treasuryAllocations[i]]; })) });
};
var OblivionHTTPClient = /** @class */ (function () {
    function OblivionHTTPClient(config) {
        if (config === void 0) { config = DEFAULT_CLIENT_CONFIG; }
        var _this = this;
        this.callPluralApi = function (api, resultMapper) { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(api)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, resultMapper ? results.map(resultMapper) : results];
                }
            });
        }); };
        this.callGetListingsApi = function (api) { return _this.callPluralApi(api, toListing); };
        this.callGetOffersApi = function (api) { return _this.callPluralApi(api, toOffer); };
        var chainId = config.chainId, endpointOverride = config.endpointOverride;
        this.http = new HTTPAPICaller(getApiBaseUrl(chainId, endpointOverride));
    }
    OblivionHTTPClient.prototype.getTotalListings = function () {
        return this.http.get('getTotalListings');
    };
    OblivionHTTPClient.prototype.getListings = function () {
        return this.callGetListingsApi('getListings');
    };
    OblivionHTTPClient.prototype.getOpenListings = function () {
        return this.callGetListingsApi('getOpenListings');
    };
    OblivionHTTPClient.prototype.getClosedListings = function () {
        return this.callGetListingsApi('getClosedListings');
    };
    OblivionHTTPClient.prototype.getSoldListings = function () {
        return this.callGetListingsApi('getSoldListings');
    };
    OblivionHTTPClient.prototype.getListingsByNft = function (nftContractAddress) {
        return this.callGetListingsApi(join('getListingsByNft', nftContractAddress));
    };
    OblivionHTTPClient.prototype.getOpenListingsByNft = function (nftContractAddress) {
        return this.callGetListingsApi("getOpenListingsByNft/".concat(nftContractAddress));
    };
    OblivionHTTPClient.prototype.getListing = function (version, listingId) {
        return __awaiter(this, void 0, void 0, function () {
            var listing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(join('getListing', version, listingId), getReturnUndefinedOn404Config())];
                    case 1:
                        listing = _a.sent();
                        return [2 /*return*/, toListing(listing)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getUserListings = function (walletAddress) {
        return this.callGetListingsApi(join('getUserListings', walletAddress));
    };
    OblivionHTTPClient.prototype.getUserListingsWithOpenOffers = function (walletAddress) {
        return this.callGetListingsApi(join('getUserListingsWithOpenOffers', walletAddress));
    };
    OblivionHTTPClient.prototype.getUserOpenListings = function (walletAddress) {
        return this.callGetListingsApi(join('getUserOpenListings', walletAddress));
    };
    OblivionHTTPClient.prototype.getOffer = function (version, listingId, paymentTokenAddress, offerId) {
        return __awaiter(this, void 0, void 0, function () {
            var offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(join('getOffer', version, listingId, paymentTokenAddress, offerId), getReturnUndefinedOn404Config())];
                    case 1:
                        offer = _a.sent();
                        return [2 /*return*/, toOffer(offer)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getOffers = function (version, listingId) {
        return this.callGetOffersApi(join('getOffers', version, listingId));
    };
    OblivionHTTPClient.prototype.getOpenOffers = function (version, listingId) {
        return this.callGetOffersApi(join('getOpenOffers', version, listingId));
    };
    OblivionHTTPClient.prototype.getTotalOffers = function (version, listingId) {
        return this.http.get(join('getTotalOffers', version, listingId));
    };
    OblivionHTTPClient.prototype.getSales = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get('getSales')];
                    case 1:
                        sales = _a.sent();
                        return [2 /*return*/, sales.map(toSale)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getNft = function (nftContractAddress) {
        return this.http.get(join('getNft', nftContractAddress), getReturnUndefinedOn404Config());
    };
    OblivionHTTPClient.prototype.getNftToken = function (nftContractAddress, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(join('getNftTokenURI', nftContractAddress, tokenId), getReturnUndefinedOn404Config())];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, toNftToken(token)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getNftTokens = function (nftContractAddress, tokenIds) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(join('getNftTokenURIs', nftContractAddress), tokenIds)];
                    case 1:
                        tokens = _a.sent();
                        return [2 /*return*/, tokens.map(toNftToken)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getTotalCollections = function () {
        return this.http.get('getTotalCollections');
    };
    OblivionHTTPClient.prototype.getCollections = function () {
        return this.callPluralApi('getCollections');
    };
    OblivionHTTPClient.prototype.getCollection = function (collectionId) {
        return this.http.get(join('getCollection', collectionId), getReturnUndefinedOn404Config());
    };
    OblivionHTTPClient.prototype.getTotalReleases = function () {
        return this.http.get('getTotalReleases');
    };
    OblivionHTTPClient.prototype.getReleases = function () {
        return this.callPluralApi('getReleases', toRelease);
    };
    OblivionHTTPClient.prototype.getRelease = function (releaseId) {
        return __awaiter(this, void 0, void 0, function () {
            var release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(join('getRelease', releaseId), getReturnUndefinedOn404Config())];
                    case 1:
                        release = _a.sent();
                        return [2 /*return*/, toRelease(release)];
                }
            });
        });
    };
    OblivionHTTPClient.prototype.getPaymentTokens = function () {
        return this.callPluralApi('getPaymentTokens');
    };
    OblivionHTTPClient.prototype.get24HourVolume = function () {
        return this.http.get('get24HourVolume');
    };
    return OblivionHTTPClient;
}());
export default OblivionHTTPClient;

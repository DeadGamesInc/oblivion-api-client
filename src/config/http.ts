import { ChainId } from '../model'
import urlJoin from '../utils/urlJoin'

const endpoints: Record<ChainId, string> = {
  [ChainId.BSC]: 'https://deadgamesapi.herokuapp.com',
  [ChainId.BSCTestnet]: 'https://deadgamesapi.herokuapp.com',
}

const basePaths: Record<ChainId, string> = {
  [ChainId.BSC]: 'oblivion/bsc',
  [ChainId.BSCTestnet]: 'oblivion/bsc_testnet',
}

export const getApiEndpoint = (chainId: ChainId): string => endpoints[chainId]
export const getApiBasePath = (chainId: ChainId): string => basePaths[chainId]
export const getApiBaseUrl = (chainId: ChainId, endpoint?: string | undefined): string =>
  urlJoin(endpoint || getApiEndpoint(chainId), getApiBasePath(chainId))

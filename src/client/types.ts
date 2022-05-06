import { ChainId } from '../model/chain'

export interface OblivionClientConfig {
  chainId: ChainId
}

export const DEFAULT_CLIENT_CONFIG: Readonly<OblivionClientConfig> = {
  chainId: ChainId.BSC,
}

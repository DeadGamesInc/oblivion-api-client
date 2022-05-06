import { OblivionClientConfig, OblivionHTTPClient } from './client'
import OblivionAPI from './model/api'
import { ChainId } from './model/chain'

export * from './model'

const oblivion = (config: OblivionClientConfig = { chainId: ChainId.BSC }): OblivionAPI =>
  new OblivionHTTPClient(config)
export default oblivion

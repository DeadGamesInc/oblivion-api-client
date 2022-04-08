import { ChainId } from 'model/chain'
import httpEndpoints from './constants'

const getHttpEndpoint = (chainId: ChainId) => httpEndpoints[chainId]

export default getHttpEndpoint

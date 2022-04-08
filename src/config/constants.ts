import { ChainId } from 'model/chain'

const httpEndpoints: { [chainId in ChainId]: string } = {
  [ChainId.BSC]: 'https://deadgamesapi.herokuapp.com/oblivion/bsc/',
  [ChainId.BSCTestnet]: 'https://deadgamesapi.herokuapp.com/oblivion/bsc_testnet/',
}

export default httpEndpoints

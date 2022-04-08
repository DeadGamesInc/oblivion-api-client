import OblivionHTTPClient from './http'
import { ChainId } from '../model/chain'

describe('HTTP Client', () => {
  const client = new OblivionHTTPClient({ chainId: ChainId.BSCTestnet })

  it('should be pretty damn cool', async () => {
    const stuff = await client.getTotalListings()
    expect(stuff).toBeGreaterThan(0)
  })
})

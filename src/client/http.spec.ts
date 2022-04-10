import OblivionHTTPClient from './http'
import { ChainId } from '../model/chain'

describe('Listing APIs', () => {
  const client = new OblivionHTTPClient({ chainId: ChainId.BSCTestnet })

  it('getTotalListings', async () => {
    const totalListings = await client.getTotalListings()
    expect(totalListings).toBeGreaterThan(0)
  })

  it('getListings', async () => {
    const listings = await client.getListings()
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getOpenListings', async () => {
    const listings = await client.getOpenListings()
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getClosedListings', async () => {
    const listings = await client.getClosedListings()
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getSoldListings', async () => {
    const listings = await client.getSoldListings()
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getListingsByNft', async () => {
    const listings = await client.getListingsByNft('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12')
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getOpenListingsByNft', async () => {
    const listings = await client.getOpenListingsByNft('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12')
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getUserListings', async () => {
    const listings = await client.getUserListings('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getUserListingsWithOpenOffers', async () => {
    const listings = await client.getUserListingsWithOpenOffers('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getUserOpenListings', async () => {
    const listings = await client.getUserOpenListings('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    expect(listings.length).toBeGreaterThan(0)
  })

  it('getListing', async () => {
    const listingId = 0
    const listing = await client.getListing(listingId)

    expect(listing).not.toBeUndefined()
    expect(listing?.id).toEqual(listingId)
  })

  it('getTotalOffers', async () => {
    const totalOffers = await client.getTotalOffers(2)
    expect(totalOffers).toBeGreaterThan(0)
  })

  it('getOffers', async () => {
    const offers = await client.getOffers(2)
    expect(Object.entries(offers).length).toBeGreaterThan(0)
  })

  it('getOpenOffers', async () => {
    const offers = await client.getOpenOffers(0)
    expect(Object.entries(offers).length).toBeGreaterThan(0)
  })

  it('getOffer', async () => {
    const offer = await client.getOffer(0, '0x0000000000000000000000000000000000000000', 0)

    expect(offer).not.toBeUndefined()
    expect(offer?.id).toEqual(0)
  })
})

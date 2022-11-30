import { resolve } from 'path'
import { matchersWithOptions } from 'jest-json-schema'
import * as TJS from 'typescript-json-schema'

import OblivionHTTPClient from './http'
import { ChainId, Listing, ListingDto, Offer } from '../model'

expect.extend(
  matchersWithOptions({
    verbose: true,
  }),
)

// Generate json type schema for Typescript interfaces
const tjsProgram = TJS.getProgramFromFiles([resolve('src/model/index.ts')], { strictNullChecks: true })

const schemaProvider = TJS.buildGenerator(tjsProgram, {
  required: true,
})
if (!schemaProvider) {
  throw new TypeError('Null schema generator')
}

const client = new OblivionHTTPClient({ chainId: ChainId.BSCTestnet })

describe('Listing APIs', () => {
  const assertValidListing = (listing: Listing) =>
    expect(listing).toMatchSchema(schemaProvider.getSchemaForSymbol('Listing'))
  const assertValidListingDto = (listing: ListingDto) =>
    expect(listing).toMatchSchema(schemaProvider.getSchemaForSymbol('ListingDto'))
  const assertValidListings = (listings: ListingDto[]) => {
    expect(listings).not.toBeUndefined()
    expect(listings.length).toBeGreaterThan(0)
    listings.forEach((listing) => assertValidListingDto(listing))
  }

  const assertValidOffer = (offer: Offer | undefined) => {
    expect(offer).not.toBeUndefined()
    expect(offer).toMatchSchema(schemaProvider.getSchemaForSymbol('Offer'))
  }

  it('getTotalListings', async () => {
    const totalListings = await client.getTotalListings()
    expect(totalListings).toBeGreaterThan(0)
  })

  it('getListings', async () => {
    const listings = await client.getListings()
    assertValidListings(listings)
  })

  it('getOpenListings', async () => {
    const listings = await client.getOpenListings()
    assertValidListings(listings)
  })

  it('getClosedListings', async () => {
    const listings = await client.getClosedListings()
    assertValidListings(listings)
  })

  it('getSoldListings', async () => {
    const listings = await client.getSoldListings()
    assertValidListings(listings)
  })

  it('getListingsByNft', async () => {
    const listings = await client.getListingsByNft('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12')
    assertValidListings(listings)
  })

  it('getOpenListingsByNft', async () => {
    const listings = await client.getOpenListingsByNft('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12')
    assertValidListings(listings)
  })

  it('getUserListings', async () => {
    const listings = await client.getUserListings('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    assertValidListings(listings)
  })

  it('getUserListingsWithOpenOffers', async () => {
    const listings = await client.getUserListingsWithOpenOffers('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    assertValidListings(listings)
  })

  it('getUserOpenListings', async () => {
    const listings = await client.getUserOpenListings('0xe8CDE3F69D7d3CAadfB2789B1A3DB60A8E70cc40')
    assertValidListings(listings)
  })

  it('getListing', async () => {
    const listingId = 0
    const listing = await client.getListing(1, listingId)
    expect(listing).not.toBeUndefined()
    assertValidListing(listing as Listing)
    expect(listing?.id).toEqual(listingId)
   })

  it('refreshListing', async () => {
    const listingId = 0
    const listing = await client.refreshListing(1, listingId)
    expect(listing).not.toBeUndefined()
    assertValidListing(listing as Listing)
    expect(listing?.id).toEqual(listingId)
   })

  it('getTotalOffers', async () => {
    const totalOffers = await client.getTotalOffers(1, 2)
    expect(totalOffers).toBeGreaterThan(0)
  })

  it('getOffers', async () => {
    const offers = await client.getOffers(1, 2)

    expect(offers.length).toBeGreaterThan(0)
    offers.forEach(assertValidOffer)
  })

  it('getUserOffers', async () => {
    const offers = await client.getUserOffers("0xB8C1FFF8b915232067c1e7449870e397E43B143b")

    expect(offers.length).toBeGreaterThan(0)
    offers.forEach(assertValidOffer)
  })

  it('getOpenOffers', async () => {
    const offers = await client.getOpenOffers(1, 0)

    expect(offers.length).toBeGreaterThan(0)
    offers.forEach(assertValidOffer)
  })

  it('getOffer', async () => {
    const offer = await client.getOffer(1, 0, '0x0000000000000000000000000000000000000000', 0)
    assertValidOffer(offer)
  })

  it('refreshOffer', async () => {
    const offer = await client.refreshOffer(1, 0, '0x0000000000000000000000000000000000000000', 0)
    assertValidOffer(offer)
  })
})

describe('Sales APIs', () => {
  it('getSales', async () => {
    const sales = await client.getSales()
    sales.forEach((sale) => expect(sale).toMatchSchema(schemaProvider.getSchemaForSymbol('Sale')))
  })
})

describe('NFT APIs', () => {
  it('getNft', async () => {
    const nft = await client.getNft('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12')
    expect(nft).toMatchSchema(schemaProvider.getSchemaForSymbol('Nft'))
  })

  it('getNfts', async () => {
    const nfts = await client.getNfts()
    nfts.forEach((nft) => expect(nft).toMatchSchema(schemaProvider.getSchemaForSymbol('Nft')))
  })

  it('getNftsByAddress', async () => {
    const nfts = await client.getNftsByAddress(['0x7A8F23c7545b4a97B15153DeB430E41b481cEA12', '0x1EA27685C246f3a9636ee5787084632FaA0dd4c8'])
    nfts.forEach((nft) => expect(nft).toMatchSchema(schemaProvider.getSchemaForSymbol('Nft')))
  })

  const nftTokenSchema = schemaProvider.getSchemaForSymbol('NftToken')
  it('getNftTokenMetadata', async () => {
    const token = await client.getNftToken('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12', 1)
    expect(token).toMatchSchema(nftTokenSchema)
  })

  it('getNftTokenMetadatas', async () => {
    const tokenIds = [1, 2, 3]
    const tokens = await client.getNftTokens('0x7A8F23c7545b4a97B15153DeB430E41b481cEA12', tokenIds)

    expect(tokens).not.toBeUndefined()
    expect(tokens.length).toBeGreaterThan(0)
    tokenIds.forEach((tokenId, i) => {
      const token = tokens[i]
      expect(token).toMatchSchema(nftTokenSchema)
      expect(token.id).toEqual(tokenId)
    })
  })
})

describe('Collection APIs', () => {
  it('getTotalCollections', async () => {
    const totalCollections = await client.getTotalCollections()
    expect(totalCollections).toBeGreaterThan(0)
  })

  const collectionSchema = schemaProvider.getSchemaForSymbol('Collection')
  it('getCollections', async () => {
    const collections = await client.getCollections()
    collections.forEach((collection) => expect(collection).toMatchSchema(collectionSchema))
  })

  it('getUserCollections', async () => {
    const collections = await client.getUserCollections('0xB8C1FFF8b915232067c1e7449870e397E43B143b')

    expect(collections.length).toBeGreaterThan(0)

    collections.forEach((collection) => expect(collection).toMatchSchema(collectionSchema))
  })

  it('getCollection', async () => {
    const collection = await client.getCollection(0)

    expect(collection).not.toBeUndefined()
    expect(collection).toMatchSchema(collectionSchema)
  })

  it('refreshCollection', async () => {
    const collection = await client.refreshCollection(0)

    expect(collection).not.toBeUndefined()
    expect(collection).toMatchSchema(collectionSchema)
  })
})

describe('Release APIs', () => {
  it('getTotalReleases', async () => {
    const totalReleases = await client.getTotalReleases()
    expect(totalReleases).toBeGreaterThan(0)
  })

  const releaseSchema = schemaProvider.getSchemaForSymbol('Release')
  it('getReleases', async () => {
    const releases = await client.getReleases()

    expect(releases).not.toBeUndefined()
    expect(releases.length).toBeGreaterThan(0)
    releases.forEach((release) => expect(release).toMatchSchema(releaseSchema))
  })

  const releaseSchema1155 = schemaProvider.getSchemaForSymbol('Release1155')
  it('getReleases1155', async () => {
    const releases = await client.getReleases1155()

    expect(releases).not.toBeUndefined()
    expect(releases.length).toBeGreaterThan(0)
    releases.forEach((release) => expect(release).toMatchSchema(releaseSchema1155))
  })

  it('getUserReleases', async () => {
    const releases = await client.getUserReleases('0xB8C1FFF8b915232067c1e7449870e397E43B143b')

    expect(releases).not.toBeUndefined()
    expect(releases.length).toBeGreaterThan(0)
    releases.forEach((release) => expect(release).toMatchSchema(releaseSchema))
  })

  it('getRelease', async () => {
    const releaseId = 1
    const release = await client.getRelease(1)

    expect(release).toMatchSchema(releaseSchema)
    expect(release).not.toBeUndefined()
    expect(release!.id).toEqual(releaseId)
  })

  it('refreshRelease', async () => {
    const releaseId = 1
    const release = await client.refreshRelease(1)

    expect(release).toMatchSchema(releaseSchema)
    expect(release).not.toBeUndefined()
    expect(release!.id).toEqual(releaseId)
  })
})

describe('Payment Token APIs', () => {
  const paymentTokenSchema = schemaProvider.getSchemaForSymbol('PaymentToken')
  it('getPaymentTokens', async () => {
    const paymentTokens = await client.getPaymentTokens()

    expect(paymentTokens).not.toBeUndefined()
    expect(paymentTokens.length).toBeGreaterThan(0)
    paymentTokens.forEach((paymentToken) => expect(paymentToken).toMatchSchema(paymentTokenSchema))
  })
})

describe('Volume APIs', () => {
  const volumeReportSchema = schemaProvider.getSchemaForSymbol('VolumeReport')
  it('get24HourVolume', async () => {
    const volume = await client.get24HourVolume()

      expect(volume).not.toBeUndefined()
      expect(volume).toMatchSchema(volumeReportSchema)
  })
})
interface CollectionReport {
    id: number
    name: string
    image: string
    volume: number
}

interface ReleaseReport {
    id: number
    volume: number
}

export default interface VolumeReport {
    totalSales: number
    totalReleaseSales: number
    totalVolume: number
    totalReleaseVolume: number
    collections: CollectionReport[]
    releases: ReleaseReport[]
}
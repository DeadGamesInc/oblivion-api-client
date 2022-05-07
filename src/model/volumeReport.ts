interface VolumeObject {
    id: number
    volume: number
}

export default interface VolumeReport {
    totalSales: number
    totalReleaseSales: number
    totalVolume: number
    totalReleaseVolume: number
    collections: VolumeObject[]
    releases: VolumeObject[]
}
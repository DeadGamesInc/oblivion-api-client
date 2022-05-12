export interface CollectionReport {
    id: number;
    name: string;
    image: string;
    volume: number;
}
interface ReleaseCollection {
    name: string;
    image: string;
}
export interface ReleaseReport {
    id: number;
    volume: number;
    collection: ReleaseCollection | null;
}
export default interface VolumeReport {
    totalSales: number;
    totalReleaseSales: number;
    totalVolume: number;
    totalReleaseVolume: number;
    collections: CollectionReport[];
    releases: ReleaseReport[];
}
export {};

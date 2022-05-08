import { OblivionClientConfig } from './client';
import OblivionAPI from './model/api';
export * from './model';
declare const oblivion: (config?: OblivionClientConfig) => OblivionAPI;
export default oblivion;

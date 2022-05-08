export interface CallConfig<T> {
    /**
     * If set, this value will be returned on 404 responses instead of an error being thrown.
     */
    default404ReturnValue?: T;
}
export declare const getReturnUndefinedOn404Config: <T>() => CallConfig<T>;
export declare class HTTPAPICaller {
    private readonly apiBaseUrl;
    constructor(baseUrl: string);
    private getUrl;
    private processErrorResponse;
    private processResponse;
    get<T>(path: string, config?: CallConfig<T>): Promise<T>;
    post<T>(path: string, body?: any, config?: CallConfig<T>): Promise<T>;
}

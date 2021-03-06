import fetch, { Response } from 'node-fetch'
import urlJoin from './urlJoin'

export interface CallConfig<T> {
  /**
   * If set, this value will be returned on 404 responses instead of an error being thrown.
   */
  default404ReturnValue?: T
}

export const getReturnUndefinedOn404Config = <T>(): CallConfig<T> => ({
  default404ReturnValue: undefined,
})

export class HTTPAPICaller {
  private readonly apiBaseUrl: string

  constructor(baseUrl: string) {
    this.apiBaseUrl = baseUrl
  }

  private getUrl(apiPath: string): string {
    return urlJoin(this.apiBaseUrl, apiPath)
  }

  private processErrorResponse = <T>(response: Response, config?: CallConfig<T>): T => {
    if (response.status === 404 && config && 'default404ReturnValue' in config) {
      return <T>config.default404ReturnValue
    }

    throw new Error(`Request failed with status code ${response.status} - ${response.statusText} - ${response.url}`)
  }

  private processResponse = async <T>(response: Response, config?: CallConfig<T>): Promise<T> => {
    if (!response.ok) {
      return this.processErrorResponse(response, config)
    }

    const content: T = await response.json()
    return content
  }

  async get<T>(path: string, config?: CallConfig<T>): Promise<T> {
    const url = this.getUrl(path)

    console.log('GET', url)
    return this.processResponse(await fetch(url), config)
  }

  async post<T>(path: string, body?: any, config?: CallConfig<T>): Promise<T> {
    const url = this.getUrl(path)

    const params = {
      method: 'post',
    }
    console.log('POST', url)
    const response = await fetch(
      url,
      body !== undefined
        ? {
            ...params,
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        : params,
    )

    return this.processResponse(response, config)
  }
}

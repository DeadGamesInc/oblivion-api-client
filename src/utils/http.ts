import fetch from 'node-fetch'

export default class HTTPAPICaller {
  private readonly endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  private getUrl(apiPath: string): string {
    return `${this.endpoint}${apiPath}`
  }

  async get<T>(path: string): Promise<T> {
    const url = this.getUrl(path)

    console.log('GET', url)
    const response = await fetch(url)
    return response.json()
  }

  async post<T>(path: string, body?: any): Promise<T> {
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
    return response.json()
  }
}

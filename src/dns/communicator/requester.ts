import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GOOGLE_DEVICE_ID } from './contants';
import { generateHash, HASH_PREFIX, GLOBAL_HASH_PREFIX } from './utils';

export default class DNSRequester {
  axios: AxiosInstance;
  sessionId = 'S/f9c7lZRDOxqgKZICJcfg==';

  constructor(private readonly baseURL: string) {
    this.axios = axios.create({
      headers: {
        Installationid: this.sessionId,
        'User-Agent': 'ru.dns.shop.android/0.85.0-1',
        'X-Dns-App-Id': '0.85.0-1',
        Cityid: '30b7c1f3-03fb-11dc-95ee-00151716f9f5',
        Googledeviceid: GOOGLE_DEVICE_ID,
      },
      withCredentials: true,
    });
  }

  /**
   * Performs a request to the dns shop api.
   * Automatically signs it using (adds X-Dns-Hash and X-Dns-Global-Hash)
   */
  async request<R>(path: string, options: Partial<AxiosRequestConfig> = {}) {
    const sanitizedPath = path.startsWith('/') ? path.substring(1) : path;
    const url = new URL(sanitizedPath, this.baseURL).toString();
    const timestamp = Date.now().toString();

    const response: AxiosResponse<R> | null = await this.axios
      .request<R>({
        url,
        ...options,
        headers: {
          'X-Dns-Timestamp': timestamp,
          'X-Dns-Hash': generateHash(
            HASH_PREFIX,
            url,
            timestamp,
            this.sessionId,
          ),
          'X-Dns-Global-Hash': generateHash(
            GLOBAL_HASH_PREFIX,
            url,
            timestamp,
            this.sessionId,
          ),
          ...options.headers,
        },
      })
      .catch((r) => null);

    return response;
  }
}

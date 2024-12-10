import { BadGatewayException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  generateHash,
  GLOBAL_HASH_PREFIX,
  HASH_PREFIX,
} from './communicator/utils';
import { SENTRY_KEY } from './communicator/contants';

@Injectable()
export class DnsService {
  sessionId = 'S/f9c7lZRDOxqgKZICJcfg==';
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://mapi.dns-shop.ru/v1',
      headers: {
        Installationid: this.sessionId,
        'User-Agent': 'ru.dns.shop.android/0.85.0-1',
        'X-Dns-App-Id': '0.85.0-1',
        Cityid: '30b7c1f3-03fb-11dc-95ee-00151716f9f5',
        Googledeviceid: 'bfc979966d96dc3d358001631ee9b635',
      },
      withCredentials: true,
    });
  }

  /**
   * Very quick&dirty implementation of DNS shop api.
   * Specifically, the search function.
   * I dont like describing things, so yes, it just works.
   */
  async search(query: string) {
    const init = 1;
    const p = 1;
    const url = `${this.client.defaults.baseURL}/get-search-result?q=${encodeURI(query)}&init=${init}&p=${p}`;
    const timestamp = Date.now().toString();

    const response: AxiosResponse | null = await this.client
      .get('/get-search-result', {
        headers: {
          'X-Dns-Timestamp': timestamp,
          'Sentry-Trace': '42e98b88099648e9bc9c94ccde30f839-a3b4e1eb67bf46d8-0',
          Baggage: `sentry-environment=production,sentry-public_key=${SENTRY_KEY},sentry-release=ru.dns.shop.android%400.85.0-1%2B850001,sentry-sample_rate=0.01,sentry-sampled=false,sentry-trace_id=42e98b88099648e9bc9c94ccde30f839,sentry-transaction=%2Fsearch_suggestions`,
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
        },
        params: { q: query, init, p },
      })
      .catch((r) => r.response);
    if (!response) throw new BadGatewayException();

    return response.data;
  }
}

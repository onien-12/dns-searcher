import { BadGatewayException, Injectable } from '@nestjs/common';
import DNSRequester from './communicator/requester';
import {
  ApiResponse,
  CatalogData,
  PriceRange,
  SearchCatalogResult,
  SearchData,
  SearchResult,
} from './types';

@Injectable()
export class DnsService {
  requester: DNSRequester;

  constructor() {
    this.requester = new DNSRequester('https://mapi.dns-shop.ru/v1/');
  }

  /**
   * Performs a dns shop search
   */
  async search(query: string, price?: PriceRange) {
    const params = new URLSearchParams([
      ['q', query],
      ['init', '1'],
      ['p', '1'],
      ['stock', 'now-today'],
    ]);

    if (price) params.set('price', `${price.min}-${price.max}`);

    const response = await this.requester.request<
      ApiResponse<SearchResult | SearchCatalogResult>
    >(`/get-search-result?${params.toString()}`);

    console.log(response.data);

    return response.data;
  }

  /**
   * Gets all products in a category
   */
  async getCategoryProducts(params: string) {
    const response = await this.requester.request<ApiResponse<CatalogData>>(
      `/get-category-products?${params}`,
    );
    return response.data;
  }
}

import { Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { DnsService } from 'src/dns/dns.service';
import { generateButtonsPrompt, generateProductsPrompt } from './constants';
import { PriceRange } from 'src/dns/types';
import { ChatModel } from 'openai/resources';

@Injectable()
export class PromptService {
  openai: OpenAI;

  constructor(private readonly dnsService: DnsService) {
    if (!process.env.OPENAI_KEY || !process.env.OPENAI_PROXY)
      throw new Error('Could not find openai keys');

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
      httpAgent: new HttpsProxyAgent(process.env.OPENAI_PROXY),
    });
  }

  /**
   * Sends a request to ai chat bot and returns his most
   * relevant response
   */
  async performPrompt(query: string, model: ChatModel = 'gpt-4o-mini') {
    const response = await this.openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: query }],
    });
    return response.choices[0].message.content;
  }

  /**
   * Extracts a json list from ai generated message
   */
  extractJsonList<T>(message: string) {
    const json = message.match(/\[(.|\n)*\]/g)[0];
    if (!json) return [];

    return JSON.parse(json) as T[];
  }

  /**
   * Returns a relevant tags by using provided query
   */
  async getTags(query: string) {
    const message = await this.performPrompt(generateProductsPrompt(query));
    return this.extractJsonList<string>(message);
  }

  /**
   * Returns a list of ai suggestions based on
   * some user query
   */
  async getSuggestions(query: string) {
    const message = await this.performPrompt(generateButtonsPrompt(query));
    return this.extractJsonList<string>(message);
  }

  /**
   * Gets a list of tags and performs a search
   * on each
   */
  async getProducts(query: string, price?: PriceRange) {
    const tags = await this.getTags(query).then((t) => t.slice(0, 10));
    const productGroups = [];
    const searches = await Promise.all(
      tags.map((tag) => this.dnsService.search(`"${tag}"`, price)),
    ).then((r) => r.filter((s) => !!s));

    // search can result with 2 different things:
    // search result and catalog result.
    // in case of catalog result we want to fetch all products from the
    // catalog and then add them to productGroups array
    for (const response of searches) {
      if (response.data.type === 'search')
        productGroups.push(...response.data.data.productGroups);
      else if (response.data.type === 'catalog') {
        const data = response.data.data;
        const catalogProducts = await this.dnsService.getCategoryProducts(
          `searchUid=${data.searchUid}&init=1&p=1&order=6` +
            (price ? `&price=${price.min}-${price.max}` : '') +
            `&${data.params}`,
        );
        if (catalogProducts?.data.productGroups)
          productGroups.push(...catalogProducts.data.productGroups);
      }
    }

    return { tags, product_groups: productGroups };
  }
}

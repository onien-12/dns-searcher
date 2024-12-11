import { Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { DnsService } from 'src/dns/dns.service';
import { generatePrompt } from './constants';

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
   * Returns a relevant tags by using provided query
   */
  async getTags(query: string) {
    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: generatePrompt(query) }],
      model: 'gpt-4o-mini',
    });
    const message = response.choices[0].message.content;
    const json = message.match(/\[(.+)\]/g)[0];
    if (!json) return [];

    const tags = JSON.parse(json);
    return tags as string[];
  }

  /**
   * Gets a list of tags and performs a search
   * on each
   */
  async getProducts(query: string) {
    const tags = await this.getTags(query).then((t) => t.slice(0, 10));
    const productGroups = [];
    const searches = await Promise.all(
      tags.map((tag) => this.dnsService.search(`"${tag}"`)),
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
          `searchUid=${data.searchUid}&init=1&p=1&order=6&${data.params}`,
        );
        if (catalogProducts?.data.productGroups)
          productGroups.push(...catalogProducts.data.productGroups);
      }
    }

    return { tags, product_groups: productGroups };
  }
}

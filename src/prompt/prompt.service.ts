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
}

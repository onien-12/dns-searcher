import { hash } from 'crypto';

export const HASH_PREFIX = '15f08f1c51a19e34c36f66247ed515da';
export const GLOBAL_HASH_PREFIX = 'bea3bdc43dd6fad3b528f5993d053baf';

export function generateHash(
  prefix: string,
  url: string,
  timestamp: string,
  session: string,
) {
  const input =
    prefix + url + timestamp + 'ru.dns.shop.android/0.85.0-1' + session;
  console.log(input);
  return hash('md5', Buffer.from(input), 'hex');
}

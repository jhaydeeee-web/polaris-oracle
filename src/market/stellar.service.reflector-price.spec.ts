import { parseReflectorPrice } from './stellar-cli-utils';

describe('parseReflectorPrice', () => {
  it('scales price by decimals into cents (14 decimals)', () => {
    // 1234567890000 / 1e14 = 0.0123456789 USD -> 1.23456789 cents -> 1 cent
    expect(parseReflectorPrice({ price: '1234567890000' }, 14, 'XLM')).toBe(1n);
  });

  it('handles bigint prices and fewer decimals', () => {
    // 12_000_000 / 1e7 = 1.2 USD -> 120 cents
    expect(parseReflectorPrice({ price: 12000000n }, 7, 'XLM')).toBe(120n);
  });

  it('throws when Reflector returned no price', () => {
    expect(() => parseReflectorPrice(null, 14, 'XLM')).toThrow('Reflector returned no price');
    expect(() => parseReflectorPrice(undefined, 14, 'XLM')).toThrow('Reflector returned no price');
  });

  it('throws on non-numeric decimals instead of returning garbage', () => {
    expect(() => parseReflectorPrice({ price: '1' }, 'x', 'XLM')).toThrow('invalid decimals');
  });
});

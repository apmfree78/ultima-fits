import FormatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional dollars', () => {
    expect(FormatMoney(1)).toEqual('$0.01');
    expect(FormatMoney(10)).toEqual('$0.10');
    expect(FormatMoney(9)).toEqual('$0.09');
    expect(FormatMoney(40)).toEqual('$0.40');
  });
  it('leaves off cents when its whole dollars', () => {
    expect(FormatMoney(5000)).toEqual('$50.00');
    expect(FormatMoney(1000)).toEqual('$10.00');
    expect(FormatMoney(5000000)).toEqual('$50,000.00');
  });
  it('works with whole and fractional dollars', () => {
    expect(FormatMoney(140)).toEqual('$1.40');
    expect(FormatMoney(5001)).toEqual('$50.01');
    expect(FormatMoney(1024)).toEqual('$10.24');
    expect(FormatMoney(5000123)).toEqual('$50,001.23');
  });
});

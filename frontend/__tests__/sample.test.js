const add = (a, b) => {
  a = parseInt(a);
  b = parseInt(b);

  return a + b;
};

describe('Same test 101', () => {
  it('works as expected', () => {
    // run our expect statements to see if test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('runs add function properly', () => {
    // run our expect statements to see if test will pass
    expect(add(1, 2)).toBeGreaterThanOrEqual(3);
  });
  it('runs add function properly', () => {
    // run our expect statements to see if test will pass
    expect(add('1', '2')).toBeGreaterThanOrEqual(3);
  });
});

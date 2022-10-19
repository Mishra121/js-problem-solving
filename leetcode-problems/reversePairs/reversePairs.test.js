
const { reversePairs } = require('.');

describe('reversePairs test cases', () => {
  it('Should return 2', () => {
    expect(reversePairs([1, 3, 2, 3, 1])).toEqual(2);
  });

  it('Should return 3', () => {
    expect(reversePairs([2,4,3,5,1])).toEqual(3);
  });
});
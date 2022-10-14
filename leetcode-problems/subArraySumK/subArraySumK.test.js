
const { subarraySum } = require('.');

describe('subarraySumK test cases', () => {
  it('Should return 2', () => {
    expect(subarraySum([1,1,1], 2)).toEqual(2);
  });

  it('Should return 2', () => {
    expect(subarraySum([1,2,3], 3)).toEqual(2);
  });

  it('Should return 1', () => {
    expect(subarraySum([-1,-1,1], 1)).toEqual(1);
  });
});
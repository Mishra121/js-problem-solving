
const { findDuplicate } = require('.');

describe('findDuplicate test cases', () => {
  it('Should return 2', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toEqual(2);
  });

  it('Should return 3', () => {
    expect(findDuplicate([3,1,3,4,2])).toEqual(3);
  });
});
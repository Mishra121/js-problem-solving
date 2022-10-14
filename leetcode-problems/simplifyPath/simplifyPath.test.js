const { simplifyPath } = require('.');

describe('simplifyPath test cases', () => {
    it('Should return /home', () => {
      expect(simplifyPath('/home/')).toEqual('/home');
    });

    it('Should return /', () => {
      expect(simplifyPath('/../')).toEqual('/');
    });

    it('Should return /home/foo', () => {
        expect(simplifyPath('/home//foo/')).toEqual('/home/foo');
    });
});
import { defaultLang } from '../Language';

describe('defaultLang', () => {
    it('should return the default language', () => {
        expect(defaultLang).toEqual(['common']);
    });
});

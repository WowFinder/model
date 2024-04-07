import {
    AssetResolver,
    AsyncAssetResolver,
    AsyncCachingAssetResolver,
} from '../index';

describe('index', () => {
    it('should export AssetResolver', () => {
        expect(AssetResolver).toBeDefined();
    });
    it('should export AsyncAssetResolver', () => {
        expect(AsyncAssetResolver).toBeDefined();
    });
    it('should export AsyncCachingAssetResolver', () => {
        expect(AsyncCachingAssetResolver).toBeDefined();
    });
});

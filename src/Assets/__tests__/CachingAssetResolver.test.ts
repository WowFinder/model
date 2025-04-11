import { AssetType } from '@wowfinder/ts-enums';
import type { AsyncAssetResolver } from '../AsyncAssetResolver';
import { AsyncCachingAssetResolver } from '../CachingAssetResolver';
import { StubbedAsyncAssetResolver } from './AsyncAssetResolver.stubs';

let backendResolver: AsyncAssetResolver;
let resolverStub: jest.Mock;
let cachingResolver: AsyncCachingAssetResolver;

describe('CachingAssetResolver', () => {
    beforeEach(() => {
        resolverStub = jest.fn();
        backendResolver = new StubbedAsyncAssetResolver(resolverStub);
        cachingResolver = new AsyncCachingAssetResolver(backendResolver);
    });
    describe('should dispatch to the correct resolver after checking the cache', () => {
        Object.values(AssetType)
            .filter(a => a !== AssetType.characters)
            .forEach(type => {
                it(`for ${type}`, () => {
                    const resolved1 = cachingResolver.resolve(
                        type as any,
                        'key',
                    );
                    const resolved2 = cachingResolver.resolve(
                        type as any,
                        'key',
                    );
                    expect(resolverStub).toHaveBeenCalledWith(type, 'key');
                    expect(resolverStub).toHaveBeenCalledTimes(1);
                    expect(resolved1).toBe(resolved2);
                });
            });
    });
    it('should throw for invalid types', () => {
        expect(() =>
            cachingResolver.resolve('invalid' as any, 'key'),
        ).toThrow();
    });

    describe('list', () => {
        it('should dispatch to the correct resolver after checking the cache', () => {
            const resolved1 = cachingResolver.list(AssetType.spells);
            const resolved2 = cachingResolver.list(AssetType.spells);
            expect(resolverStub).toHaveBeenCalledWith(AssetType.spells);
            expect(resolverStub).toHaveBeenCalledTimes(1);
            expect(resolved1).toBe(resolved2);
        });
    });
});

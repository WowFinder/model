import { AssetType } from '@wowfinder/ts-enums';
import { stubAsyncAssetResolver } from './AsyncAssetResolver.stubs';
import { AsyncAssetResolver } from '../AsyncAssetResolver';

let StubbedAsyncAssetResolver: ReturnType<typeof stubAsyncAssetResolver>;
let resolverStub: jest.Mock;

describe('AsyncAssetResolver', () => {
    beforeEach(() => {
        resolverStub = jest.fn();
        StubbedAsyncAssetResolver = stubAsyncAssetResolver(resolverStub);
    });
    describe('resolve', () => {
        it('should dispatch to the correct resolver', () => {
            const resolver =
                new StubbedAsyncAssetResolver() as AsyncAssetResolver;
            Object.values(AssetType)
                .filter(a => a !== AssetType.characters)
                .forEach(type => {
                    resolver.resolve(type as any, 'key');
                    expect(resolverStub).toHaveBeenCalledWith(type, 'key');
                });
        });
        it('should throw for invalid types', () => {
            const resolver =
                new StubbedAsyncAssetResolver() as AsyncAssetResolver;
            expect(() => resolver.resolve('invalid' as any, 'key')).toThrow();
        });
    });
});

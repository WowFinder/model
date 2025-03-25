import { AssetType } from '@wowfinder/ts-enums';
import { StubbedAsyncAssetResolver } from './AssetResolver.stubs';

let resolverStub: jest.Mock;

describe('AsyncAssetResolver', () => {
    beforeEach(async () => {
        resolverStub = jest.fn();
    });
    describe('resolve', () => {
        it('should dispatch to the correct resolver', () => {
            const resolver = new StubbedAsyncAssetResolver(resolverStub);
            Object.values(AssetType)
                .filter(a => a !== AssetType.characters)
                .forEach(async type => {
                    await resolver.resolve(type as any, 'key');
                    expect(resolverStub).toHaveBeenCalledWith(type, 'key');
                });
        });
        it('should throw for invalid types', () => {
            const resolver = new StubbedAsyncAssetResolver(resolverStub);
            expect(() => resolver.resolve('invalid' as any, 'key')).toThrow();
        });
    });
});

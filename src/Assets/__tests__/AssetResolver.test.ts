import { AssetType } from '@wowfinder/ts-enums';
import { stubAssetResolver } from './AssetResolver.stubs';
import { AssetResolver } from '../AssetResolver';

let StubbedAssetResolver: ReturnType<typeof stubAssetResolver>;
let resolverStub: jest.Mock;

describe('AssetResolver', () => {
    beforeEach(() => {
        resolverStub = jest.fn();
        StubbedAssetResolver = stubAssetResolver(resolverStub);
    });
    describe('resolve', () => {
        it('should dispatch to the correct resolver', () => {
            const resolver = new StubbedAssetResolver() as AssetResolver;
            Object.values(AssetType)
                .filter(a => a !== AssetType.characters)
                .forEach(type => {
                    resolver.resolve(type as any, 'key');
                    expect(resolverStub).toHaveBeenCalledWith(type, 'key');
                });
        });
        it('should throw for invalid types', () => {
            const resolver = new StubbedAssetResolver() as AssetResolver;
            expect(() => resolver.resolve('invalid' as any, 'key')).toThrow();
        });
    });
});

import { SpellCoreComponent } from '@wowfinder/ts-enums';
import { parseSpellComponent } from '../Components';
import { buildItem } from '../../../Item/builders';

jest.mock('../../../Item/builders', () => ({
    buildItem: jest.fn(),
}));

describe('Components', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('parseSpellComponent', () => {
        const coreComponentKeys = Object.keys(SpellCoreComponent).map(
            k => k as SpellCoreComponent,
        );
        it.each(coreComponentKeys)(
            'should parse core component keyword %s',
            input => {
                const result = parseSpellComponent(input);
                expect(result).toBe(
                    SpellCoreComponent[
                        input as keyof typeof SpellCoreComponent
                    ],
                );
            },
        );
        it('should defer to the base item builder for any other input', () => {
            const result = parseSpellComponent('unknown');
            expect(buildItem).toHaveBeenCalledTimes(1);
            expect(buildItem).toHaveBeenCalledWith('unknown');
            expect(result).toBeUndefined();
        });
    });
});

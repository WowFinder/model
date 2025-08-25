import { SpellCoreComponent } from '@wowfinder/ts-enums';
import { parseSpellComponent } from '../Components';
import { buildItem } from '../../../Item/builders';

jest.mock('../../../Item/builders', () => ({
    buildItem: jest.fn(),
}));

describe('Components', () => {
    describe('parseSpellComponent', () => {
        it.each(['verbal', 'somatic', 'material'])(
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
            expect(buildItem).toHaveBeenCalledWith('unknown');
            expect(result).toBeUndefined();
        });
    });
});

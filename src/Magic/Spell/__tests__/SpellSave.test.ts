import { Save, SpellSaveEffect } from '@wowfinder/ts-enums';
import { SpellSave } from '../SpellSave';

describe('SpellSave', () => {
    it('should create a new instance', () => {
        const save = new SpellSave({
            effect: SpellSaveEffect.negate,
            save: Save.will,
        });
        expect(save).toBeInstanceOf(SpellSave);
        expect(save.effect).toBe(SpellSaveEffect.negate);
        expect(save.save).toBe(Save.will);
    });
});

import { Save } from '@wowfinder/ts-enums';

enum SpellSaveEffect {
    negate = 'negate',
    partial = 'partial',
    half = 'half',
    special = 'special',
}

interface SpellSaveBuilder {
    effect: SpellSaveEffect;
    save: Save;
}

class SpellSave implements SpellSaveBuilder {
    #effect: SpellSaveEffect;
    #save: Save;
    constructor({ effect, save }: SpellSaveBuilder) {
        this.#effect = effect;
        this.#save = save;
    }

    get effect(): SpellSaveEffect {
        return this.#effect;
    }

    get save(): Save {
        return this.#save;
    }
}

export { SpellSaveEffect, SpellSave };

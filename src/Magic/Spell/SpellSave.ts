import { Save, SpellSaveEffect } from '@wowfinder/ts-enums';

interface SpellSaveBuilder {
    effect: SpellSaveEffect;
    save: Save;
}

class SpellSave implements SpellSaveBuilder {
    readonly #effect: SpellSaveEffect;
    readonly #save: Save;
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

export { SpellSave };

import { EffectiveCasterLevels } from 'Magic';
import { Resistances } from '../Resistances';
import { Speeds } from '../Speeds';
import { StatSet } from '../Stats';
import { FeatChoice } from '../helpers';
import { CharacterOverride } from './CharacterOverride';
import { CharacterBase } from './base';
import { OverridableCharacterBaseBuilder } from './builder';
import { Size } from '@wowfinder/ts-enums';

abstract class OverridableCharacterBase extends CharacterBase {
    #override: CharacterOverride | null;

    constructor({ override, ...rest }: OverridableCharacterBaseBuilder) {
        super({ ...rest });
        this.#override = override ? new CharacterOverride(override) : null;
    }

    get override(): CharacterOverride | null {
        return this.#override;
    }

    get key(): string {
        return this.#override?.key ?? super.key;
    }

    get feats(): FeatChoice[] {
        return this.#override?.feats ?? super.feats;
    }

    get miscHP(): number | undefined {
        return this.#override?.miscHP ?? super.miscHP;
    }

    get baseStats(): StatSet {
        return { ...super.baseStats, ...this.#override?.baseStats };
    }

    get baseResistances(): Resistances {
        return new Resistances({
            ...super.baseResistances,
            ...this.#override?.baseResistances,
        });
    }

    get size(): Size {
        return this.#override?.size ?? super.size;
    }

    get speeds(): Speeds {
        return this.#override?.speeds ?? super.speeds;
    }

    get naturalArmor(): number {
        return this.#override?.naturalArmor ?? super.naturalArmor;
    }

    get casterLevelsBonus(): EffectiveCasterLevels {
        return this.#override?.casterLevelsBonus ?? super.casterLevelsBonus;
    }

    setOverride(override: CharacterOverride): void {
        this.#override = override;
    }

    clearOverride(): void {
        this.#override = null;
    }
}

export { OverridableCharacterBase };

import { StatsBlock } from '../Stats';
import { sizeCombatMod } from '../Size';
import { ArmorValues } from './ArmorValues';
import { FullArmorValuesBuilder, FullFromBaseBuilder } from './builder';

class FullArmorValues extends ArmorValues {
    readonly #strength: number;
    readonly #dexterity: number;
    readonly #baseAttack: number;
    readonly #size: number;

    constructor({
        strength = 0,
        dexterity = 0,
        baseAttack = 0,
        size = 0,
        ...rest
    }: FullArmorValuesBuilder) {
        super(rest);
        this.#strength = strength;
        this.#dexterity = dexterity;
        this.#baseAttack = baseAttack;
        this.#size = size;
    }

    static fromBaseValues({
        base,
        stats,
        baseAttack,
        size,
    }: FullFromBaseBuilder): FullArmorValues {
        const mods = new StatsBlock(stats).totalMods;
        return new FullArmorValues({
            ...base,
            strength: mods.strength,
            dexterity: mods.dexterity,
            baseAttack,
            size: sizeCombatMod(size),
        });
    }

    get strength(): number {
        return this.#strength;
    }

    get dexterity(): number {
        return this.#dexterity;
    }

    get baseAttack(): number {
        return this.#baseAttack;
    }

    get size(): number {
        return this.#size;
    }

    get touch(): FullArmorValues {
        return new FullArmorValues({
            armor: 0,
            shield: 0,
            dodge: this.dodge,
            natural: 0,
            deflection: this.deflection,
            misc: this.misc + this.miscEvasion,
            miscPhysical: 0,
            miscEvasion: 0,
            temporary: this.temporary + this.temporaryEvasion,
            temporaryPhysical: 0,
            temporaryEvasion: 0,
            dexterity: this.dexterity,
            size: this.size,
        });
    }

    get flatFooted(): FullArmorValues {
        return new FullArmorValues({
            armor: this.armor,
            shield: this.shield,
            dodge: 0,
            natural: this.natural,
            deflection: this.deflection,
            misc: this.misc + this.miscPhysical,
            miscPhysical: 0,
            miscEvasion: 0,
            temporary: this.temporary + this.temporaryPhysical,
            temporaryPhysical: 0,
            temporaryEvasion: 0,
            dexterity: 0,
            size: this.size,
        });
    }

    get total(): number {
        return (
            10 +
            this.armor +
            this.shield +
            this.natural +
            this.dodge +
            this.deflection +
            this.dexterity +
            this.size +
            this.misc +
            this.miscPhysical +
            this.miscEvasion +
            this.temporary +
            this.temporaryPhysical +
            this.temporaryEvasion
        );
    }

    get maneuverDefense(): number {
        return (
            10 +
            this.baseAttack +
            this.strength +
            this.dexterity +
            this.size +
            this.dodge +
            this.deflection +
            this.misc +
            this.miscEvasion +
            this.temporary +
            this.temporaryEvasion
        );
    }

    get maneuverDefenseFlatFooted(): number {
        return (
            10 +
            this.baseAttack +
            this.strength +
            this.size +
            this.misc +
            this.temporary
        );
    }

    export(): FullArmorValuesBuilder {
        return {
            ...super.export(),
            strength: this.strength,
            dexterity: this.dexterity,
            baseAttack: this.baseAttack,
            size: this.size,
        };
    }

    static get zero(): FullArmorValues {
        return new FullArmorValues({});
    }
}

export { FullArmorValues };

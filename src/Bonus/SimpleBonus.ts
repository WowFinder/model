import { ResistancesBonus } from './ResistancesBonus';
import { SensesBonus } from './SensesBonus';
import { SimpleBonusBuilder } from './SimpleBonus.builder';
import { SkillsBonus } from './SkillsBonus';
import { StatsBonus } from './StatsBonus';
import { VitalNeedsBonus } from './VitalNeedsBonus';
import {
    exportBonus,
    maxBonus,
    multiplyBonus,
    sumBonus,
} from './SimpleBonus.helpers';
import { JsonCompatible, JsonExportable } from '@wowfinder/ts-utils';
import { SpellPowerBonus } from './SpellPowerBonus';
import { FeatsBonus } from './FeatsBonus';
import { BaseSpeedsBonus, SpeedsModifiersBonus } from './SpeedsBonus';

type Zeroable = { isZero: boolean };

class SimpleBonus implements JsonExportable<SimpleBonusBuilder> {
    readonly #hp: number;
    readonly #armorClass: number;
    readonly #stats: StatsBonus;
    readonly #skills: SkillsBonus;
    readonly #resistances: ResistancesBonus;
    readonly #vitalNeeds: VitalNeedsBonus;
    readonly #senses: SensesBonus;
    readonly #spellPower: SpellPowerBonus;
    readonly #feats: FeatsBonus;
    readonly #baseSpeeds: BaseSpeedsBonus;
    readonly #speedsModifiers: SpeedsModifiersBonus;

    constructor({
        hp = 0,
        armorClass = 0,
        stats = {},
        skills = {},
        resistances = {},
        vitalNeeds = {},
        senses = {},
        spellPower = {},
        feats = [],
        baseSpeeds = {},
        speedsModifiers = {},
    }: SimpleBonusBuilder = {}) {
        this.#hp = hp;
        this.#armorClass = armorClass;
        this.#stats = new StatsBonus(stats);
        this.#skills = new SkillsBonus(skills);
        this.#resistances = new ResistancesBonus(resistances);
        this.#vitalNeeds = new VitalNeedsBonus(vitalNeeds);
        this.#senses = new SensesBonus(senses);
        this.#spellPower = new SpellPowerBonus(spellPower);
        this.#feats = new FeatsBonus(feats ?? []);
        this.#baseSpeeds = new BaseSpeedsBonus(baseSpeeds);
        this.#speedsModifiers = new SpeedsModifiersBonus(speedsModifiers);
    }

    get hp(): number {
        return this.#hp;
    }

    get armorClass(): number {
        return this.#armorClass;
    }

    get stats(): StatsBonus {
        return this.#stats;
    }

    get skills(): SkillsBonus {
        return this.#skills;
    }

    get resistances(): ResistancesBonus {
        return this.#resistances;
    }

    get vitalNeeds(): VitalNeedsBonus {
        return this.#vitalNeeds;
    }

    get senses(): SensesBonus {
        return this.#senses;
    }

    get spellPower(): SpellPowerBonus {
        return this.#spellPower;
    }

    get feats(): FeatsBonus {
        return this.#feats;
    }

    get baseSpeeds(): BaseSpeedsBonus {
        return this.#baseSpeeds;
    }

    get speedsModifiers(): SpeedsModifiersBonus {
        return this.#speedsModifiers;
    }

    get #allNumericValuesZero(): boolean {
        return this.#hp === 0 && this.#armorClass === 0;
    }

    get #allCompoundValuesZero(): boolean {
        return [
            this.#stats,
            this.#skills,
            this.#resistances,
            this.#vitalNeeds,
            this.#senses,
            this.#spellPower,
            this.#feats,
            this.#baseSpeeds,
            this.#speedsModifiers,
        ].every((value: Zeroable) => value.isZero);
    }

    get isZero(): boolean {
        return this.#allNumericValuesZero && this.#allCompoundValuesZero;
    }

    export(): JsonCompatible<SimpleBonusBuilder> {
        return exportBonus(this);
    }

    static get zero(): SimpleBonus {
        return new SimpleBonus({});
    }

    static sum(...args: SimpleBonus[]): SimpleBonus {
        return new SimpleBonus(sumBonus(...args));
    }

    static max(...args: SimpleBonus[]): SimpleBonus {
        return new SimpleBonus(maxBonus(...args));
    }

    static multiply(bonus: SimpleBonus, factor: number): SimpleBonus {
        return new SimpleBonus(multiplyBonus(bonus, factor));
    }
}

export { SimpleBonus };

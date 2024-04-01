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

class SimpleBonus implements JsonExportable<SimpleBonusBuilder> {
    #hp: number;
    #armorClass: number;
    #stats: StatsBonus;
    #skills: SkillsBonus;
    #resistances: ResistancesBonus;
    #vitalNeeds: VitalNeedsBonus;
    #senses: SensesBonus;
    #spellPower: SpellPowerBonus;
    #feats: FeatsBonus;
    #baseSpeeds: BaseSpeedsBonus;
    #speedsModifiers: SpeedsModifiersBonus;

    constructor(builder: SimpleBonusBuilder = {}) {
        this.#hp = builder.hp ?? 0;
        this.#armorClass = builder.armorClass ?? 0;
        this.#stats = new StatsBonus(builder.stats ?? {});
        this.#skills = new SkillsBonus(builder.skills ?? {});
        this.#resistances = new ResistancesBonus(builder.resistances ?? {});
        this.#vitalNeeds = new VitalNeedsBonus(builder.vitalNeeds ?? {});
        this.#senses = new SensesBonus(builder.senses ?? {});
        this.#spellPower = new SpellPowerBonus(builder.spellPower ?? {});
        this.#feats = new FeatsBonus(builder.feats ?? []);
        this.#baseSpeeds = new BaseSpeedsBonus(builder.baseSpeeds ?? {});
        this.#speedsModifiers = new SpeedsModifiersBonus(
            builder.speedsModifiers ?? {},
        );
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

    get isZero(): boolean {
        return (
            this.#hp === 0 &&
            this.#armorClass === 0 &&
            this.#stats.isZero &&
            this.#skills.isZero &&
            this.#resistances.isZero &&
            this.#vitalNeeds.isZero &&
            this.#senses.isZero &&
            this.#spellPower.isZero &&
            this.#feats.isZero &&
            this.#baseSpeeds.isZero &&
            this.#speedsModifiers.isZero
        );
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

import { BonusType } from '@wowfinder/ts-enums';
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

class SimpleBonus implements JsonExportable<SimpleBonusBuilder> {
    #type: BonusType;
    #hp: number;
    #armorClass: number;
    #stats: StatsBonus;
    #skills: SkillsBonus;
    #resistances: ResistancesBonus;
    #vitalNeeds: VitalNeedsBonus;
    #senses: SensesBonus;
    #spellPower: SpellPowerBonus;
    #feats: any; // TODO

    constructor(builder: SimpleBonusBuilder) {
        this.#type = builder.type;
        this.#hp = builder.hp ?? 0;
        this.#armorClass = builder.armorClass ?? 0;
        this.#stats = new StatsBonus(builder.stats ?? {});
        this.#skills = new SkillsBonus(builder.skills ?? {});
        this.#resistances = new ResistancesBonus(builder.resistances ?? {});
        this.#vitalNeeds = new VitalNeedsBonus(builder.vitalNeeds ?? {});
        this.#senses = new SensesBonus(builder.senses ?? {});
        this.#spellPower = new SpellPowerBonus(builder.spellPower ?? {});
        // TODO ...
    }

    get type(): BonusType {
        return this.#type;
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

    get isZero(): boolean {
        return (
            this.#hp === 0 &&
            this.#armorClass === 0 &&
            this.#stats.isZero &&
            this.#skills.isZero &&
            this.#resistances.isZero &&
            this.#vitalNeeds.isZero
            // TODO && ...
        );
    }

    export(): JsonCompatible<SimpleBonusBuilder> {
        return exportBonus(this);
    }

    static zero(type: BonusType = BonusType.temporal): SimpleBonus {
        return new SimpleBonus({ type });
    }

    static sum(type: BonusType, ...args: SimpleBonus[]): SimpleBonus {
        return new SimpleBonus(sumBonus(type, ...args));
    }

    static max(type: BonusType, ...args: SimpleBonus[]): SimpleBonus {
        return new SimpleBonus(maxBonus(type, ...args));
    }

    static multiply(bonus: SimpleBonus, factor: number): SimpleBonus {
        return new SimpleBonus(multiplyBonus(bonus, factor));
    }
}

export { SimpleBonus };

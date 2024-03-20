import {
    Aura,
    CastingMode,
    Size,
    School,
    SubSchool,
} from '@wowfinder/ts-enums';
import { Exportable, JsonValue, sum } from '@wowfinder/ts-utils';
import { Armor } from '../Item';
import { Inventory } from '../Item/Inventory';
import {
    computedSpellPower,
    EffectiveCasterLevels,
    FullComputedSpellPower,
    fullComputedSpellPower,
} from '../Magic';
import { ArmorValues, FullArmorValues } from '../Creature/ArmorValues';
import {
    CharacterBuilder,
    CharacterExport,
    CharacterOverride,
    PersonalCharacterBase,
    SkillRanks,
} from './base';
import { Bonus } from './Bonus';
import {
    Class,
    ClassBonuses,
    ClassFeature,
    ClassLevels,
} from '../Creature/Class';
import {
    ClassAurasCondensed,
    getAuraBonuses,
    condenseClassAuras,
    getClassAuras,
} from '../Creature/Class/Aura/characterHelpers';
import { CondensedClassFeatures } from '../Creature/Class/Features';
import {
    getClassFeatures,
    getClassFeaturesCondensed,
} from '../Creature/Class/Features/characterHelpers';
import { Feat, feats } from './Feats';
import { buildStats, checkClass, checkRace } from './helpers';
import Race from '../Creature/Race';
import { Resistances } from './Resistances';
import { Saves, SimpleSaves } from './Saves';
import { statMod, StatsBlock } from 'Creature/Stats';

type Characters = { [key: string]: Character };

class Character extends PersonalCharacterBase implements Exportable<JsonValue> {
    #active: boolean;
    #race: Race;
    #classes: ClassLevels;
    #skillRanks: SkillRanks;
    #armor: ArmorValues;
    #resistances: Resistances;
    #inventory: Inventory;

    #cachedClassBonuses: ClassBonuses | null = null;
    #cachedGearBonuses: Bonus | null = null;

    constructor({
        active = true,
        classes = [],
        skillRanks = {},
        inventory = Inventory.defaultBuilder,
        ...rest
    }: CharacterBuilder) {
        super({
            ...rest,
            builderType: 'race',
        });
        this.#race = checkRace(rest.race);
        this.#active = active;
        this.#classes = [];
        for (const { class: c, level } of classes) {
            this.#classes.push({ class: checkClass(c), level });
        }
        const auras = this.auraBonuses;
        this.#skillRanks = { ...skillRanks };
        this.#armor = ArmorValues.zero;
        this.#resistances = Resistances.fromCategorized({
            misc: auras.resistances.values,
        });
        this.#inventory = new Inventory(inventory);

        this.#forceResetCache();
    }

    setOverride(override: CharacterOverride): void {
        super.setOverride(override);
        this.#forceResetCache();
    }

    clearOverride(): void {
        super.clearOverride();
        this.#forceResetCache();
    }

    #invalidateCache(): void {
        this.#cachedClassBonuses = null;
        this.#cachedGearBonuses = null;
    }

    #forceResetCache(): void {
        this.#cachedGearBonuses = this.#combineGearBonuses();
        this.#cachedClassBonuses = Class.multiclass(this.#classes);
    }

    get active(): boolean {
        return this.#active;
    }

    get stats(): StatsBlock {
        return buildStats({
            base: this.baseStats,
            race: this.#race,
            auras: this.auraBonuses,
            gear: this.gearBonuses,
        });
    }

    get race(): Race | null {
        return this.#race || null;
    }

    get classes(): ClassLevels {
        return this.#classes.map(({ class: c, level }) => ({
            class: c,
            level,
        }));
    }

    get skillRanks(): SkillRanks {
        return { ...this.#skillRanks };
    }

    get armor(): FullArmorValues {
        return FullArmorValues.fromBaseValues({
            base: this.#armor.export(),
            stats: this.stats,
            baseAttack: this.classBonuses.bab,
            size: this.#race?.size || Size.medium,
        });
    }

    get saves(): Saves {
        return new Saves({
            stats: this.stats,
            base: new SimpleSaves(this.classBonuses.saves),
            enhance: SimpleSaves.zero, // TODO #432
            gear: new SimpleSaves(this.gearBonuses.saves),
            misc: SimpleSaves.zero, // TODO #432
            temp: SimpleSaves.zero, // TODO #432
        });
    }

    get resistances(): Resistances {
        return this.#resistances;
    }

    get inventory(): Inventory {
        return this.#inventory;
    }

    get classBonuses(): ClassBonuses {
        return (this.#cachedClassBonuses ||= Class.multiclass(this.#classes));
    }

    get casterLevels(): EffectiveCasterLevels {
        const efl = this.classBonuses.efl;
        const bonus = this.casterLevelsBonus;
        return {
            arcane: efl.arcane + bonus.arcane,
            divine: efl.divine + bonus.divine,
            spontaneous: efl.spontaneous + bonus.spontaneous,
        };
    }

    get totalLevel(): number {
        return sum(...this.classes.map(entry => entry.level));
    }

    get maxSkillRanks(): number {
        return (
            this.classBonuses.skillRanks +
            statMod(this.stats.intrinsic.intelligence) * this.totalLevel
        );
    }

    get maxHitPoints(): number {
        return (
            this.classBonuses.hp +
            statMod(this.stats.totals.constitution) * this.totalLevel
        );
    }

    get allFeats(): Feat[] {
        return this.feats.map(entry => entry.feat);
    }

    get validFeats(): Feat[] {
        return this.feats
            .filter(entry => {
                const levelReq =
                    (entry.class
                        ? sum(
                              ...this.#classes
                                  .filter(c => entry.class === c.class)
                                  .map(c => c.level),
                          )
                        : sum(...this.classes.map(entry => entry.level))) >=
                    entry.level;
                return (
                    entry.level === 0 ||
                    (levelReq && feats[entry.feat].requirements.test(this))
                );
            })
            .map(entry => entry.feat);
    }

    #combineGearBonuses(): Bonus {
        const combined = Bonus.combine(
            ...this.#inventory.gear.map(g => g.bonuses),
        ).gear;
        // this.#stats = this.stats.updated({ gear: combined.stats.values });
        this.#resistances = this.#resistances.updatedByCategory({
            gear: combined.resistances.values,
        });
        const allArmor: Armor[] = this.#inventory.gear
            .filter(g => g instanceof Armor)
            .map(g => g as Armor);
        this.#armor = new ArmorValues({
            armor: Math.max(
                ...allArmor.map(a => a.fullBonus.bonuses.armor.armorClass),
            ),
            shield: Math.max(
                ...allArmor.map(a => a.fullBonus.bonuses.shield.armorClass),
            ),
            natural: this.naturalArmor,
            miscPhysical: combined.armorClass,
        });
        return combined;
    }

    get gearBonuses(): Bonus {
        return (this.#cachedGearBonuses ||= this.#combineGearBonuses());
    }

    get classFeatures(): ClassFeature[] {
        return getClassFeatures(this.classes);
    }

    get classFeaturesCondensed(): CondensedClassFeatures {
        return getClassFeaturesCondensed(this.classes);
    }

    get classAuras(): Aura[] {
        return this.classes.map(c => c.class.auras(c.level)).flat();
    }

    get classAurasCondensed(): ClassAurasCondensed {
        return condenseClassAuras(getClassAuras(this.classes));
    }

    get auraBonuses(): Bonus {
        return getAuraBonuses(getClassAuras(this.classes));
    }

    spellPower(mode: CastingMode, school: School | SubSchool): number {
        return computedSpellPower(
            this.gearBonuses.spellPower,
            mode,
            school,
            this.stats.totals,
            this.classBonuses.efl,
        );
    }

    get fullSpellPower(): FullComputedSpellPower {
        return fullComputedSpellPower(
            this.gearBonuses.spellPower,
            this.stats.totals,
            this.classBonuses.efl,
        );
    }

    addLevel(cls: Class, levels = 1): ClassLevels {
        const matches = this.#classes.filter(c => c.class.key === cls.key);
        if (matches.length > 0) {
            matches[0].level += levels;
        } else {
            this.#classes.push({ class: cls, level: levels });
        }
        this.#invalidateCache();
        return this.classes;
    }

    export(): CharacterExport {
        return {
            ...super.export(),
            race: this.#race?.key || '',
            classes: this.#classes.map(c => ({
                class: c.class.key,
                level: c.level,
            })),
            active: this.#active,
            skillRanks: this.#skillRanks,
            inventory: this.#inventory.export(),
        };
    }

    static build(raw: any): Character {
        // TODO #281: Validate props
        return new Character(raw);
    }

    // static #loaded: Characters | null = null;

    static load(): Characters {
        throw new Error('Not implemented');
        /* return (this.#loaded ||= forceDataLoadKeyS<Character>(
            window.Main.asset('Characters'),
            this.build,
        )); */
    }
}

export type { Characters, CharacterBuilder, CharacterExport };
export { Character };

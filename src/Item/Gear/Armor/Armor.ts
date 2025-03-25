import { ArmorFlags, ArmorType } from '@wowfinder/ts-enums';
import { MultiBonus } from '../../../Character/Bonus';
import { Gear } from '../base';
import { ArmorBuilder, armorPreBuild } from './builder';

class Armor extends Gear {
    #type: ArmorType;
    #acBonus: number;
    #intrinsic: number;
    #maxDex: number;
    #acp: number;
    #asf: number;
    #flags: Set<ArmorFlags>;

    constructor({
        type = ArmorType.misc,
        acBonus = 0,
        intrinsic = 0,
        maxDex = Number.POSITIVE_INFINITY,
        acp = 0,
        asf = 0,
        flags = new Set<ArmorFlags>(),
        ...args
    }: ArmorBuilder) {
        super(args);
        this.#type = type;
        this.#acBonus = acBonus;
        this.#intrinsic = intrinsic;
        this.#maxDex = maxDex;
        this.#acp = acp;
        this.#asf = asf;
        this.#flags = new Set(flags);
    }

    get maxDex(): number {
        return this.#maxDex;
    }

    get acp(): number {
        return this.#acp;
    }

    get asf(): number {
        return this.#asf;
    }

    get flags(): Set<ArmorFlags> {
        return new Set(this.#flags);
    }

    get encumbering(): boolean {
        return (
            this.#type === ArmorType.heavy || this.#type === ArmorType.medium
        );
    }

    get fullBonus(): MultiBonus {
        return new MultiBonus({
            gear: this.bonuses,
        });
    }

    get type(): ArmorType {
        return this.#type;
    }

    get acBonus(): number {
        return this.#acBonus;
    }

    get intrinsic(): number {
        return this.#intrinsic;
    }

    get $type(): string {
        return 'Armor';
    }

    static preBuild(raw: any): ArmorBuilder {
        return armorPreBuild(raw);
    }

    static build(raw: any = {}): Armor {
        return new Armor(Armor.preBuild(raw));
    }
}

export { Armor };

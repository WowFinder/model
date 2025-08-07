import { FeatFlag, Stat, ClassFeature } from '@wowfinder/ts-enums';
import {
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterLevelRequirement,
    ClassFeatureRequirement,
} from '../../../Requirements';
import {
    and as allOf,
    CharacterFeatRequirement,
    characterStatsRequirement,
    MinStatsRequirement,
    or as either,
} from '../../../Requirements';
import { Feat, type WeaponFeat, weaponFeats } from '../Feat';
import { FeatSpec } from '../FeatSpec';
import { type CharacterRequirements } from '../../../Requirements/base';

const raw: { [key in Feat]?: FeatSpec } = {};
type PendingFeatReqs = Feat[];
const pendingReqs: { [key in Feat]?: PendingFeatReqs } = {};

type Req = CharacterRequirements;
type Reqs = CharacterRequirements[];
type Flags = Iterable<FeatFlag>;

function checkNoDuplicate(key: string): void {
    if (Object.keys(raw).includes(key)) {
        throw new Error(`Duplicate feat key: ${key}`);
    }
}

function _feat(
    key: Feat,
    reqs?: Req,
    flags?: Flags,
    pending: PendingFeatReqs = [],
): FeatSpec {
    raw[key] = new FeatSpec({
        label: key,
        requirements: reqs,
        flags,
    });
    pendingReqs[key] = pending;
    return raw[key];
}

function feat(
    key: Feat,
    reqs?: Req,
    flags?: Flags,
    pending: PendingFeatReqs = [],
): FeatSpec {
    checkNoDuplicate(key);
    return _feat(key, reqs, flags, pending);
}

const req = {
    none: allOf() as Req,
    level: {
        global: (level: number): Req => new CharacterLevelRequirement(level),
        caster: (level: number): Req => new CasterLevelRequirement(level),
        bab: (level: number): Req => new AttackBonusRequirement(level),
    },
    stat: (stat: Stat, min: number): Req =>
        characterStatsRequirement(new MinStatsRequirement({ [stat]: min })),
    feats: (...feats: Feat[]): PendingFeatReqs => feats,
    features: (...features: ClassFeature[]): Reqs =>
        features.map(f => new ClassFeatureRequirement(f)),
};
const build = {
    basic: (key: Feat, pending?: PendingFeatReqs, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [], pending),
    save: (key: Feat, pending?: PendingFeatReqs, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.saves], pending),
    combat: (key: Feat, pending?: PendingFeatReqs, ...reqs: Reqs): FeatSpec =>
        feat(key, allOf(...reqs), [FeatFlag.combat], pending),
    /*expertise: (
        key: Feat,
        pending?: PendingFeatReqs,
        ...reqs: Reqs
    ): FeatSpec =>
        feat(
            key,
            allOf(...reqs),
            [FeatFlag.combat, FeatFlag.expertise],
            pending,
        ),*/
};

const allFeatKeys = Object.keys(Feat);
function checkFeatKey(key: string): asserts key is Feat {
    if (!allFeatKeys.includes(key)) {
        throw new Error(`Invalid feat key: ${key}`);
    }
}

const allWeaponFeatKeys = Object.keys(weaponFeats);
function checkWeaponFeatKey(key: string): asserts key is WeaponFeat {
    if (!allWeaponFeatKeys.includes(key)) {
        throw new Error(`Invalid weapon feat key: ${key}`);
    }
}

function applyPendingReqs(allFeats: { [key in Feat]: FeatSpec }): void {
    Object.entries(pendingReqs).forEach(([key, pending]) => {
        checkFeatKey(key);
        const featSpec = allFeats[key];
        _feat(
            key,
            allOf(
                featSpec.requirements,
                ...pending.map(f => new CharacterFeatRequirement(f)),
            ),
            featSpec.flags,
        );
    });
}

export {
    raw,
    req,
    build,
    feat,
    allOf,
    either,
    checkFeatKey,
    checkWeaponFeatKey,
    checkNoDuplicate,
    applyPendingReqs,
    type Req,
    type Reqs,
    type Flags,
    type PendingFeatReqs,
};

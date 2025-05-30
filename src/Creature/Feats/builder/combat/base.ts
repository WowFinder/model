import { FeatFlag, Stat } from '@wowfinder/ts-enums';
import { Feat } from '../../Feat';
import type { FeatSpec } from '../../FeatSpec';
import type { CombatBaseFeat } from '../../core/combat/base';
import { allOf, build, feat, req } from '../helpers';

const combatBaseFeats: { [key in CombatBaseFeat]: FeatSpec } = {
    agileManeuvers: build.combat(Feat.agileManeuvers),
    arcaneArmorTraining: feat(
        Feat.arcaneArmorTraining,
        allOf(req.level.caster(3)), // TODO #441: Add requirement: Proficiency w/ light armor
        [FeatFlag.combat, FeatFlag.magic],
    ),
    arcaneArmorMastery: feat(
        Feat.arcaneArmorMastery,
        req.level.caster(7), // TODO #441: medium armor
        [FeatFlag.combat, FeatFlag.magic],
        req.feats(Feat.arcaneArmorTraining),
    ),
    // TODO #442: Add requirement: arcane casting
    arcaneStrike: feat(Feat.arcaneStrike, undefined, [
        FeatFlag.combat,
        FeatFlag.magic,
    ]),
    blindCombat: build.combat(Feat.blindCombat),
    catchOffGuard: build.combat(Feat.catchOffGuard),
    combatReflexes: build.combat(Feat.combatReflexes),
    standStill: build.combat(Feat.standStill, req.feats(Feat.combatReflexes)),
    deadlyAim: build.combat(
        Feat.deadlyAim,
        [],
        req.stat(Stat.dexterity, 13),
        req.level.bab(1),
    ),
    defensiveCombatTraining: build.combat(Feat.defensiveCombatTraining),
    disruptive: build.combat(Feat.disruptive, [], req.level.bab(6)),
    spellBreaker: build.combat(Feat.spellBreaker, [], req.level.bab(10)),
    improvedInitiative: build.combat(Feat.improvedInitiative),
    improvisedWeaponMastery: build.combat(
        Feat.improvisedWeaponMastery,
        req.feats(Feat.catchOffGuard, Feat.throwAnything),
    ),
    lunge: build.combat(Feat.lunge, [], req.level.bab(6)),
    quickDraw: build.combat(Feat.quickDraw, [], req.level.bab(1)),
    stepUp: build.combat(Feat.stepUp, [], req.level.bab(1)),
    strikeBack: build.combat(Feat.strikeBack, [], req.level.bab(11)),
    throwAnything: build.combat(Feat.throwAnything),
    toughness: build.combat(Feat.toughness),
    weaponFinesse: build.combat(Feat.weaponFinesse),
};

export { combatBaseFeats };

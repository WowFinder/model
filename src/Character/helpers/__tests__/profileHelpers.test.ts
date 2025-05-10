import { getBaseProfile, totalize } from '../profileHelpers';
import {
    mkExpandedCreature,
    mkMinimalCreature,
} from '../../../Creature/__tests__/helpers';
import { MultiBonus } from '../../../Bonus';
import { fullMultiBonusBuilder } from '../../../__mocks__';
import { baseDefault } from '../../../Creature/Stats/helpers';
import { Feat } from '../../../Creature/Feats/Feat';

describe('profileHelpers', () => {
    describe('getBaseProfile', () => {
        it('should return a profile with the correct values', async () => {
            const creature = await mkMinimalCreature();
            const profile = getBaseProfile(creature);
            expect(profile.stats).toEqual(creature.baseStats);
            expect(profile.speeds.export()).toEqual({
                ...creature.race.speeds.export(),
                dexBonus: 0,
                otherInitiativeModifiers: [],
            });
            expect(profile.vitals.hp.max).toBe(0);
            expect(profile.vitals.sanity.max).toBe(0);
        });
    });
    describe('totalize', () => {
        it('should return a profile with the correct values', async () => {
            const creature = await mkExpandedCreature();
            const fullMultiBonus = new MultiBonus(fullMultiBonusBuilder);
            // TODO: support including feats from RawCreatureAsset
            const profile = {
                ...getBaseProfile(creature),
                feats: {
                    [Feat.acrobaticSteps]: 1,
                },
            };
            const total = totalize(profile, fullMultiBonus);
            expect(total.stats).toEqual({
                ...baseDefault,
                constitution: -2, // 10 - 6*2
                charisma: 22, // 10 + 6*2
                intelligence: 22, // 10 + 6*2
            });
            expect(total.feats).toEqual({
                [Feat.arcaneArmorTraining]: 1,
                [Feat.cleave]: 1,
                [Feat.combatCasting]: 1,
                [Feat.greaterSpellFocusEvocation]: 1,
                [Feat.powerAttack]: 1,
                [Feat.spellFocusEvocation]: 1,
                [Feat.acrobaticSteps]: 1,
            });
        });
    });
});

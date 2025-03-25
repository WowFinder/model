import { RawSpellAsset } from '@wowfinder/asset-schemas';

const yellowSnowBall = {
    key: 'yellowSnowBall',
    ranks: [
        {
            rank: 1,
            area: 'sphere.point(20 foot)',
            damage: {
                types: ['cold', 'nature'],
                baseRoll: {
                    sides: 6,
                },
                rollMultiplier: 'totalLevel',
            },
        },
        {
            rank: 2,
            area: 'sphere.point(40 foot)',
            damage: {
                types: ['cold', 'nature'],
                baseRoll: {
                    sides: 6,
                    qtty: 2,
                },
                rollMultiplier: 'totalLevel',
            },
        },
        {
            rank: 3,
            area: 'sphere.point(60 foot)',
            damage: {
                types: ['cold', 'nature'],
                baseRoll: {
                    sides: 6,
                    qtty: 3,
                },
                rollMultiplier: 'totalLevel',
            },
        },
    ],
    school: 'evocation',
    castingTime: 'standard',
    components: ['verbal', 'somatic', 'material'],
    range: 'long',
    duration: 'instantaneous',
    save: {
        save: 'reflex',
        effect: 'half',
    },
    flags: ['spellResistance'],
} as RawSpellAsset;

export { yellowSnowBall };

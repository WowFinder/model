import { RawRaceAsset } from '@wowfinder/asset-schemas';
import { Alignment, InnateTrait, Languages } from '@wowfinder/ts-enums';
import { zeroStatsMock } from './Stats';

const mockedRaceRawAsset: RawRaceAsset = {
    key: 'mocked-race',
    racialPoints: 10,
    size: 0,
    statMods: zeroStatsMock,
    initialLanguages: [Languages.common],
    additionalLanguages: [],
    commonAlignments: [Alignment.neutralNeutral],
    speeds: {
        base: 30,
    },
    saves: {
        fortitude: 1,
        reflexes: -1,
        will: 0,
    },
    resistances: {
        cold: 5,
    },
    traits: [InnateTrait.darkvision60],
    vitals: {
        sleepTimeReduction: '2h',
        breathHoldingTimeBonus: '30s',
    },
};

export { mockedRaceRawAsset };

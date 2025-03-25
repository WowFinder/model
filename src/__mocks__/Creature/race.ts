import { RawRaceAsset } from '@wowfinder/asset-schemas';
import { Alignment, Languages } from '@wowfinder/ts-enums';
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
};

export { mockedRaceRawAsset };

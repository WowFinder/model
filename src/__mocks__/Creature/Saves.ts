import { RawSaves } from '@wowfinder/asset-schemas';
import { SaveBreakdown, SaveBreakdowns } from '../../Creature';

const mockZero = (): SaveBreakdown =>
    new SaveBreakdown({
        stat: 0,
        base: 0,
        enhancement: 0,
        gear: 0,
        misc: 0,
        temporary: 0,
    });

const zeroSavesMock: SaveBreakdowns = {
    fortitude: mockZero(),
    reflexes: mockZero(),
    will: mockZero(),
};

const zeroRawSavesMock: RawSaves = {
    fortitude: 0,
    reflexes: 0,
    will: 0,
};

const exampleSavesMock: SaveBreakdowns = {
    fortitude: new SaveBreakdown({
        stat: 3,
        base: 5,
        enhancement: 1,
        gear: 0,
        misc: 1,
        temporary: 0,
    }),
    reflexes: new SaveBreakdown({
        stat: 2,
        base: 4,
        enhancement: 0,
        gear: 1,
        misc: 1,
        temporary: 0,
    }),
    will: new SaveBreakdown({
        stat: 1,
        base: 4,
        enhancement: 1,
        gear: 2,
        misc: 1,
        temporary: 3,
    }),
};

const exampleRawSavesMock: RawSaves = {
    fortitude: 10,
    reflexes: 8,
    will: 12,
};

export { zeroSavesMock, zeroRawSavesMock, exampleSavesMock, exampleRawSavesMock };

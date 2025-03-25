import { RawStats } from '@wowfinder/asset-schemas';
import { PartialStatBlock } from '../../Creature';

const zeroStatsMock: RawStats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
};

const defaultStatsMock: RawStats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

const mixedStatsMock: RawStats = {
    strength: 16,
    dexterity: 14,
    constitution: 12,
    intelligence: 18,
    wisdom: 10,
    charisma: 8,
};

const minimalStatsMock: RawStats = {
    strength: 3,
    dexterity: 3,
    constitution: 3,
    intelligence: 3,
    wisdom: 3,
    charisma: 3,
};

const twentyStatsMock: RawStats = {
    strength: 20,
    dexterity: 20,
    constitution: 20,
    intelligence: 20,
    wisdom: 20,
    charisma: 20,
};

const meleeBonusesStatsMock: RawStats = {
    ...zeroStatsMock,
    strength: +2,
    dexterity: +1,
};

const mixedBonusStatsMock: RawStats = {
    ...zeroStatsMock,
    constitution: -2,
    intelligence: +2,
    charisma: +2,
};

const goodFinesseStatsMock: RawStats = {
    ...defaultStatsMock,
    strength: 8,
    dexterity: 12,
};

const badFinesseStatsMock: RawStats = {
    ...defaultStatsMock,
    strength: 12,
    dexterity: 8,
};

const mixedStatBlockMock: PartialStatBlock = {
    base: mixedStatsMock,
    racial: mixedBonusStatsMock,
};

export {
    zeroStatsMock,
    mixedStatsMock,
    minimalStatsMock,
    defaultStatsMock,
    twentyStatsMock,
    goodFinesseStatsMock,
    badFinesseStatsMock,
    meleeBonusesStatsMock,
    mixedBonusStatsMock,
    mixedStatBlockMock,
};

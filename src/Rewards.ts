interface RewardByFaction {
    [factionLabel: string]: number;
}

interface RewardByCharacter {
    [characterKey: string]: number;
}

interface RewardsByCharacter {
    [characterKey: string]: RewardByFaction;
}

interface RewardsByFaction {
    [factionLabel: string]: RewardByCharacter;
}

export type {
    RewardByFaction,
    RewardsByCharacter,
    RewardsByFaction,
    RewardByCharacter,
};

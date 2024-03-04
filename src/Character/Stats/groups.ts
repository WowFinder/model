import {
    StatKey,
    StatGroup,
    MentalStatKey,
    PhysicalStatKey,
} from '@wowfinder/ts-enums';

const statGroups = {
    [StatGroup.physical]: Object.keys(PhysicalStatKey),
    [StatGroup.mental]: Object.keys(MentalStatKey),
};

function inGroup(stat: StatKey, group: StatGroup): boolean {
    return statGroups[group].includes(stat);
}

export { statGroups, inGroup };

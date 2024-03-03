import { AlignmentDescriptor, Alignment } from '@wowfinder/ts-enums';

function combineAlignmentDescriptors(
    ...descriptors: AlignmentDescriptor[]
): Alignment {
    const uniques = [...new Set(descriptors)];
    const isGood = uniques.includes(AlignmentDescriptor.good);
    const isEvil = uniques.includes(AlignmentDescriptor.evil);
    let morals: 'G' | 'N' | 'E' = 'N';
    if (isGood && !isEvil) {
        morals = 'G';
    }
    if (isEvil && !isGood) {
        morals = 'E';
    }
    const isLawful = uniques.includes(AlignmentDescriptor.lawful);
    const isChaotic = uniques.includes(AlignmentDescriptor.chaotic);
    let ethics: 'L' | 'N' | 'C' = 'N';
    if (isLawful && !isChaotic) {
        ethics = 'L';
    }
    if (isChaotic && !isLawful) {
        ethics = 'C';
    }
    return Alignment[`${ethics}${morals}`];
}

const playableAlignments = [
    Alignment.LG,
    Alignment.LN,
    Alignment.NG,
    Alignment.NN,
    Alignment.CG,
    Alignment.CN,
];

const isGood = (alignment: Alignment): boolean => /G/.test(alignment);
const isEvil = (alignment: Alignment): boolean => /E/.test(alignment);
const isChaotic = (alignment: Alignment): boolean => /C/.test(alignment);
const isLawful = (alignment: Alignment): boolean => /L/.test(alignment);
const isNeutral = (alignment: Alignment): boolean => /N/.test(alignment);

export {
    isGood,
    isEvil,
    isChaotic,
    isLawful,
    isNeutral,
    combineAlignmentDescriptors,
    playableAlignments,
};

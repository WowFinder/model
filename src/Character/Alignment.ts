import { AlignmentDescriptor, Alignment } from '@wowfinder/ts-enums';

function combineAlignmentDescriptors(
    ...descriptors: AlignmentDescriptor[]
): Alignment {
    const uniques = [...new Set(descriptors)];
    const isGood = uniques.includes(AlignmentDescriptor.good);
    const isEvil = uniques.includes(AlignmentDescriptor.evil);
    let morals: 'Good' | 'Neutral' | 'Evil' = 'Neutral';
    if (isGood && !isEvil) {
        morals = 'Good';
    }
    if (isEvil && !isGood) {
        morals = 'Evil';
    }
    const isLawful = uniques.includes(AlignmentDescriptor.lawful);
    const isChaotic = uniques.includes(AlignmentDescriptor.chaotic);
    let ethics: 'lawful' | 'neutral' | 'chaotic' = 'neutral';
    if (isLawful && !isChaotic) {
        ethics = 'lawful';
    }
    if (isChaotic && !isLawful) {
        ethics = 'chaotic';
    }
    return Alignment[`${ethics}${morals}`];
}

const playableAlignments = [
    Alignment.lawfulGood,
    Alignment.lawfulNeutral,
    Alignment.neutralGood,
    Alignment.neutralNeutral,
    Alignment.chaoticGood,
    Alignment.chaoticNeutral,
];

const isGood = (alignment: Alignment): boolean => alignment.endsWith('Good');
const isEvil = (alignment: Alignment): boolean => alignment.endsWith('Evil');
const isChaotic = (alignment: Alignment): boolean =>
    alignment.startsWith('chaotic');
const isLawful = (alignment: Alignment): boolean =>
    alignment.startsWith('lawful');
const isNeutral = (alignment: Alignment): boolean =>
    alignment.toLowerCase().includes('neutral');

export {
    isGood,
    isEvil,
    isChaotic,
    isLawful,
    isNeutral,
    combineAlignmentDescriptors,
    playableAlignments,
};

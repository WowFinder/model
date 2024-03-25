import { AlignmentDescriptor, Alignment } from '@wowfinder/ts-enums';
import {
    isGood,
    isEvil,
    isChaotic,
    isLawful,
    isNeutral,
    combineAlignmentDescriptors,
    playableAlignments,
} from '../Alignment';

describe('Axis-checking functions', () => {
    describe('isGood', () => {
        it('returns true for good alignments', () => {
            expect(isGood(Alignment.lawfulGood)).toBe(true);
            expect(isGood(Alignment.neutralGood)).toBe(true);
            expect(isGood(Alignment.chaoticGood)).toBe(true);
        });

        it('returns false for non-good alignments', () => {
            expect(isGood(Alignment.lawfulNeutral)).toBe(false);
            expect(isGood(Alignment.neutralNeutral)).toBe(false);
            expect(isGood(Alignment.chaoticNeutral)).toBe(false);
            expect(isGood(Alignment.lawfulEvil)).toBe(false);
            expect(isGood(Alignment.neutralEvil)).toBe(false);
            expect(isGood(Alignment.chaoticEvil)).toBe(false);
        });
    });

    describe('isEvil', () => {
        it('returns true for evil alignments', () => {
            expect(isEvil(Alignment.lawfulEvil)).toBe(true);
            expect(isEvil(Alignment.neutralEvil)).toBe(true);
            expect(isEvil(Alignment.chaoticEvil)).toBe(true);
        });

        it('returns false for non-evil alignments', () => {
            expect(isEvil(Alignment.lawfulNeutral)).toBe(false);
            expect(isEvil(Alignment.neutralNeutral)).toBe(false);
            expect(isEvil(Alignment.chaoticNeutral)).toBe(false);
            expect(isEvil(Alignment.lawfulGood)).toBe(false);
            expect(isEvil(Alignment.neutralGood)).toBe(false);
            expect(isEvil(Alignment.chaoticGood)).toBe(false);
        });
    });

    describe('isChaotic', () => {
        it('returns true for chaotic alignments', () => {
            expect(isChaotic(Alignment.chaoticGood)).toBe(true);
            expect(isChaotic(Alignment.chaoticNeutral)).toBe(true);
            expect(isChaotic(Alignment.chaoticEvil)).toBe(true);
        });

        it('returns false for non-chaotic alignments', () => {
            expect(isChaotic(Alignment.lawfulGood)).toBe(false);
            expect(isChaotic(Alignment.lawfulNeutral)).toBe(false);
            expect(isChaotic(Alignment.lawfulEvil)).toBe(false);
            expect(isChaotic(Alignment.neutralGood)).toBe(false);
            expect(isChaotic(Alignment.neutralNeutral)).toBe(false);
            expect(isChaotic(Alignment.neutralEvil)).toBe(false);
        });
    });

    describe('isLawful', () => {
        it('returns true for lawful alignments', () => {
            expect(isLawful(Alignment.lawfulGood)).toBe(true);
            expect(isLawful(Alignment.lawfulNeutral)).toBe(true);
            expect(isLawful(Alignment.lawfulEvil)).toBe(true);
        });

        it('returns false for non-lawful alignments', () => {
            expect(isLawful(Alignment.neutralGood)).toBe(false);
            expect(isLawful(Alignment.neutralNeutral)).toBe(false);
            expect(isLawful(Alignment.neutralEvil)).toBe(false);
            expect(isLawful(Alignment.chaoticGood)).toBe(false);
            expect(isLawful(Alignment.chaoticNeutral)).toBe(false);
            expect(isLawful(Alignment.chaoticEvil)).toBe(false);
        });
    });

    describe('isNeutral', () => {
        it('returns true for neutral alignments', () => {
            expect(isNeutral(Alignment.lawfulNeutral)).toBe(true);
            expect(isNeutral(Alignment.neutralGood)).toBe(true);
            expect(isNeutral(Alignment.neutralNeutral)).toBe(true);
            expect(isNeutral(Alignment.neutralEvil)).toBe(true);
            expect(isNeutral(Alignment.chaoticNeutral)).toBe(true);
        });

        it('returns false for non-neutral alignments', () => {
            expect(isNeutral(Alignment.lawfulGood)).toBe(false);
            expect(isNeutral(Alignment.lawfulEvil)).toBe(false);
            expect(isNeutral(Alignment.chaoticGood)).toBe(false);
            expect(isNeutral(Alignment.chaoticEvil)).toBe(false);
        });
    });
});

describe('combineAlignmentDescriptors', () => {
    it('combines descriptors into an alignment', () => {
        expect(combineAlignmentDescriptors(AlignmentDescriptor.good)).toBe(
            Alignment.neutralGood,
        );
        expect(
            combineAlignmentDescriptors(
                AlignmentDescriptor.good,
                AlignmentDescriptor.lawful,
            ),
        ).toBe(Alignment.lawfulGood);
        expect(
            combineAlignmentDescriptors(
                AlignmentDescriptor.good,
                AlignmentDescriptor.chaotic,
            ),
        ).toBe(Alignment.chaoticGood);
        expect(
            combineAlignmentDescriptors(
                AlignmentDescriptor.evil,
                AlignmentDescriptor.lawful,
            ),
        ).toBe(Alignment.lawfulEvil);
        expect(
            combineAlignmentDescriptors(
                AlignmentDescriptor.evil,
                AlignmentDescriptor.chaotic,
            ),
        ).toBe(Alignment.chaoticEvil);
        expect(
            combineAlignmentDescriptors(
                AlignmentDescriptor.lawful,
                AlignmentDescriptor.chaotic,
            ),
        ).toBe(Alignment.neutralNeutral);
    });
});

describe('playableAlignments', () => {
    it('should allow any non-evil alignment for players', () => {
        Object.values(Alignment).forEach(alignment => {
            if (isEvil(alignment)) {
                expect(playableAlignments).not.toContain(alignment);
            } else {
                expect(playableAlignments).toContain(alignment);
            }
        });
    });
});

import { Class } from '../../../Creature';
import * as rawMocks from './RawClassAsset';

const mockArcaneClass = new Class(rawMocks.mockArcaneClassRawAsset);
const mockDivineClass = new Class(rawMocks.mockDivineClassRawAsset);
const mockDruidricClass = new Class(rawMocks.mockDruidricClassRawAsset);
const mockMeleeClass = new Class(rawMocks.mockMeleeClassRawAsset);
const mockStealthClass = new Class(rawMocks.mockStealthClassRawAsset);
const mockSuperHybridClass = new Class(rawMocks.mockSuperHybridClassRawAsset);

const mockedClasses = [
    mockArcaneClass,
    mockDivineClass,
    mockDruidricClass,
    mockMeleeClass,
    mockStealthClass,
    mockSuperHybridClass,
] as const;

export {
    mockArcaneClass,
    mockDivineClass,
    mockDruidricClass,
    mockMeleeClass,
    mockStealthClass,
    mockSuperHybridClass,
    mockedClasses,
};

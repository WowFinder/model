import { mockAssetResolver } from '../../../__mocks__';
import {
    type FeatChoice,
    type FeatChoiceExport,
    parseFeatChoice,
    parseFeatChoices,
    exportFeatChoice,
    exportFeatChoices,
} from '../Choice';

describe('Choice', () => {
    it('should parse a valid feat choice', async () => {
        const raw: FeatChoiceExport = {
            feat: 'leadership',
            class: 'mocked-arcane-class',
            level: 2,
        };

        const choice = await parseFeatChoice(raw, mockAssetResolver);
        expect(choice).toEqual({
            feat: 'leadership',
            class: expect.objectContaining({ key: 'mocked-arcane-class' }),
            level: 2,
        });
    });

    it('should return undefined for an unknown feat', async () => {
        const raw: FeatChoiceExport = {
            feat: 'unknown-feat',
            level: 1,
        };

        const choice = await parseFeatChoice(raw, mockAssetResolver);
        expect(choice).toBeUndefined();
    });

    it('should export a feat choice correctly', async () => {
        const choice: FeatChoice = {
            feat: 'leadership',
            class: await mockAssetResolver.resolveClass('mocked-arcane-class'),
            level: 2,
        };

        const exported = exportFeatChoice(choice);
        expect(exported).toEqual({
            feat: 'leadership',
            class: 'mocked-arcane-class',
            level: 2,
        });
    });

    it('should parse multiple feat choices', async () => {
        const rawChoices: FeatChoiceExport[] = [
            { feat: 'endurance', class: 'mocked-melee-class', level: 1 },
            { feat: 'run', level: 2 },
        ];

        const choices = await parseFeatChoices(rawChoices, mockAssetResolver);
        expect(choices.length).toBe(2);
    });

    it('should export multiple feat choices', async () => {
        const choices: FeatChoice[] = [
            {
                feat: 'endurance',
                class: await mockAssetResolver.resolveClass('mocked-melee-class'),
                level: 1,
            },
            { feat: 'run', class: undefined, level: 2 },
        ];

        const exported = exportFeatChoices(...choices);
        expect(exported).toEqual([
            { feat: 'endurance', class: 'mocked-melee-class', level: 1 },
            { feat: 'run', level: 2 },
        ]);
    });
});


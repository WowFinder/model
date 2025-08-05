import { type JsonValue } from '@wowfinder/ts-utils';
import { type Class } from '../Class';
import { Feat } from './Feat';
import { type AsyncAssetResolver } from '../../Assets';

type FeatChoice = {
    feat: Feat;
    class?: Class;
    level: number;
};

type FeatChoiceExport = {
    [key: string]: JsonValue;
    feat: string;
    class?: string;
    level: number;
};

async function parseFeatChoice(
    raw: FeatChoiceExport,
    resolver: AsyncAssetResolver,
): Promise<FeatChoice | undefined> {
    const feat: Feat | undefined = Feat[raw.feat as keyof typeof Feat] as Feat;
    if (!feat) {
        console.warn(`Unknown feat key: ${raw.feat}`);
        return undefined;
    }

    const res: FeatChoice = {
        feat,
        class: raw.class ? await resolver.resolveClass(raw.class) : undefined,
        level: raw.level,
    };

    return res;
}

async function parseFeatChoices(
    raw: FeatChoiceExport[],
    resolver: AsyncAssetResolver,
): Promise<FeatChoice[]> {
    const res: FeatChoice[] = [];
    for (const f of raw) {
        const choice = await parseFeatChoice(f, resolver);
        if (choice) {
            res.push(choice);
        }
    }
    return res;
}

function exportFeatChoice(choice: FeatChoice): FeatChoiceExport {
    return {
        feat: choice.feat,
        class: choice.class ? choice.class.key : undefined,
        level: choice.level,
    };
}

function exportFeatChoices(...choices: FeatChoice[]): FeatChoiceExport[] {
    return choices.map(exportFeatChoice);
}

export {
    type FeatChoice,
    type FeatChoiceExport,
    parseFeatChoice,
    parseFeatChoices,
    exportFeatChoice,
    exportFeatChoices,
};

import { RawCreatureAsset } from "@wowfinder/asset-schemas";
import { AsyncAssetResolver } from "../../Assets";
import { CreatureBase } from "../CreatureBase";
import {
    mockAssetResolver,
    rawBaseCreatureExpanded,
    rawBaseCreatureMinimal,
} from '../../__mocks__';

class CreatureBaseImpl extends CreatureBase {
    private constructor(args: ConstructorParameters<typeof CreatureBase>[0]) {
        super(args);
    }

    static async build(
        rawAsset: RawCreatureAsset,
        resolver: AsyncAssetResolver,
    ): Promise<CreatureBaseImpl> {
        const args = await this.buildCreatureArgs(rawAsset, resolver);
        return new this(args);
    }
}

async function mkMinimalCreature(): Promise<CreatureBase> {
    return CreatureBaseImpl.build(
        rawBaseCreatureMinimal,
        mockAssetResolver,
    );
}

async function mkExpandedCreature(): Promise<CreatureBase> {
    return CreatureBaseImpl.build(
        rawBaseCreatureExpanded,
        mockAssetResolver,
    );
}

export { CreatureBaseImpl, mkMinimalCreature, mkExpandedCreature };
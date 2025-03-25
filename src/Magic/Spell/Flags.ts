import { SpellFlag } from '@wowfinder/ts-enums';

function tryParseFlag(flag: string): SpellFlag | undefined {
    return SpellFlag[flag as keyof typeof SpellFlag] as SpellFlag;
}

function parseValidFlags(flags: string[]): SpellFlag[] {
    return flags.map(tryParseFlag).filter(Boolean) as SpellFlag[];
}

export { tryParseFlag, parseValidFlags };

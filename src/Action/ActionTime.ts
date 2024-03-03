import { ActionLength } from '@wowfinder/ts-enums';
import { Time } from '../Units';

type Stringifier<T> = (
    value: T,
    t: (key: string, ...params: any[]) => string,
) => string;

type ActionTime = ActionLength | Time | 'special';
type Parseable = Exclude<ActionTime, 'special'> | string;

const stringify: Stringifier<ActionTime> = (value, t) => {
    if (value === 'special') {
        return t('magic.castingTime.special');
    }
    if (value instanceof Time) {
        return value.toString();
    }
    return t(`action.${value}`);
};

const ActionTime = {
    tryParse(input: string): ActionTime | undefined {
        if (input === 'special') {
            return 'special';
        }
        if (input in ActionLength) {
            return ActionLength[input as keyof typeof ActionLength];
        }
        const time = Time.tryParseTime(input);
        if (time) {
            return time;
        }
        return undefined;
    },

    tryParseExtended(input: Parseable): ActionTime | undefined {
        return typeof input === 'string' ? ActionTime.tryParse(input) : input;
    },

    parseExtended(input: Parseable): ActionTime {
        const result = ActionTime.tryParseExtended(input);
        if (result) {
            return result;
        }
        throw new Error(`Invalid ActionTime: ${input}`);
    },

    forceParse(
        input: string,
        defaultValue: ActionTime = 'special',
    ): ActionTime {
        return ActionTime.tryParse(input) ?? defaultValue;
    },
    stringify,
} as const;

export { ActionTime };

import { TimeUnit } from '@wowfinder/ts-enums';
import { converter, makeConverter, Scalar } from './Scalar';

const convertTime: converter<TimeUnit> = makeConverter({
    [TimeUnit.second]: 1, // Reference unit
    [TimeUnit.turn]: 6, // 1t = 6s; 10t = 1m
    [TimeUnit.minute]: 60, // 1m = 60s;
    [TimeUnit.hour]: 60 * 60, // 1h = 60m
    [TimeUnit.day]: 60 * 60 * 24, // 1d = 24h
    [TimeUnit.year]: 60 * 60 * 24 * 365, // 1y = 365d
});

const timeUnitAliases: { [key: string]: TimeUnit } = {
    s: TimeUnit.second,
    t: TimeUnit.turn,
    m: TimeUnit.minute,
    h: TimeUnit.hour,
    d: TimeUnit.day,
    y: TimeUnit.year,
    '"': TimeUnit.second,
    "'": TimeUnit.minute,
    '°': TimeUnit.hour,
};

class Time extends Scalar<TimeUnit> {
    get fullYears(): number {
        return Math.floor(convertTime(this, TimeUnit.year).value);
    }

    convert(to: TimeUnit): Time {
        const { value, unit } = convertTime(this, to);
        return new Time({
            value,
            unit,
        });
    }

    static tryParseTime(input: string): Time | undefined {
        const base = Scalar.tryParse<TimeUnit>(
            input,
            unit =>
                TimeUnit[unit as keyof typeof TimeUnit] ??
                timeUnitAliases[unit],
        );
        return base ? new Time(base) : undefined;
    }

    static parseTime(input: string): Time {
        const parsed = Time.tryParseTime(input);
        if (!parsed) {
            throw new Error(`Unable to parse time from input: ${input}`);
        }
        return parsed;
    }
}

export { convertTime, Time };

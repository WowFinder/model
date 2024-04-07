import { type FlyManeuverability } from '@wowfinder/ts-enums';
import { sum } from '@wowfinder/ts-utils';
import { Speed, commonSpeedUnits, encumberedRaw } from 'Scalar';

interface SpeedsProfile {
    baseSpeed: Speed;
    reducedSpeed: Speed;
    burrowSpeed?: Speed;
    climbSpeed?: Speed;
    flySpeed?: Speed;
    flyManeuverability?: FlyManeuverability;
    swimSpeed?: Speed;
    initiative: number;
}

interface SpeedsProfileBuilder {
    baseSpeed: number;
    encumberance?: boolean;
    burrowSpeed?: number;
    climbSpeed?: number;
    flySpeed?: number;
    flyManeuverability?: FlyManeuverability;
    swimSpeed?: number;
    dexBonus?: number;
    otherInitiativeModifiers?: number[];
}

function mkSpeed(rawFeetTurn: number): Speed;
function mkSpeed(rawFeetTurn?: number): Speed | undefined;

function mkSpeed(rawFeetTurn?: number): Speed | undefined {
    return rawFeetTurn
        ? new Speed({ value: rawFeetTurn, unit: commonSpeedUnits.feetTurn })
        : undefined;
}

class SpeedsProfileImpl implements SpeedsProfile {
    readonly baseSpeed: Speed;
    readonly reducedSpeed: Speed;
    readonly burrrowSpeed?: Speed;
    readonly climbSpeed?: Speed;
    readonly flySpeed?: Speed;
    readonly swimSpeed?: Speed;
    readonly flyManeuverability?: FlyManeuverability;
    readonly initiative: number;

    constructor({
        baseSpeed,
        encumberance = false,
        burrowSpeed,
        climbSpeed,
        flySpeed,
        flyManeuverability,
        swimSpeed,
        dexBonus = 0,
        otherInitiativeModifiers = [],
    }: SpeedsProfileBuilder) {
        this.baseSpeed = mkSpeed(baseSpeed);
        this.reducedSpeed = mkSpeed(
            encumberance ? encumberedRaw(baseSpeed) : baseSpeed,
        );
        this.burrrowSpeed = mkSpeed(burrowSpeed);
        this.climbSpeed = mkSpeed(climbSpeed);
        this.flySpeed = mkSpeed(flySpeed);
        this.swimSpeed = mkSpeed(swimSpeed);
        this.flyManeuverability = flyManeuverability;
        this.initiative = sum(dexBonus, ...otherInitiativeModifiers);
    }
}

function buildSpeedsProfile(data: SpeedsProfileBuilder): SpeedsProfile {
    return new SpeedsProfileImpl(data);
}

export type { SpeedsProfile };
export { buildSpeedsProfile };

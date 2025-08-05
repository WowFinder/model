import { FunctionBasedRequirement } from '../base';

const smallNumberThreshold = 100;

function numberIsOdd(value: number): boolean {
    return Math.floor(value) % 2 !== 0;
}

function numberIsSmall(value: number): boolean {
    return value < smallNumberThreshold;
}

const oddNumberRequirement = new FunctionBasedRequirement(numberIsOdd);
const smallNumberRequirement = new FunctionBasedRequirement(numberIsSmall);

export { oddNumberRequirement, smallNumberRequirement };

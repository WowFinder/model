import { School, SubSchool, subSchoolParents } from '@wowfinder/ts-enums';

function subSchoolsByParent(parent: School): SubSchool[] {
    return Object.keys(SubSchool)
        .map(k => k as SubSchool)
        .filter(sub => subSchoolParents[sub] === parent)
        .map(sub => SubSchool[sub]);
}

type SchoolValues<T> = {
    [key in School]: T;
};
type SchoolValuesPartial<T> = {
    [key in School]?: T;
};
function fillSchoolValues<T>(
    values: SchoolValuesPartial<T>,
    defaultValue: T,
): SchoolValues<T> {
    const full: SchoolValuesPartial<T> = {};
    const givenKeys = Object.keys(values);
    for (const k of Object.keys(School)) {
        const s = k as School;
        full[s] = givenKeys.includes(k) ? values[s] : defaultValue;
    }
    return full as SchoolValues<T>;
}

type SubSchoolValues<T> = {
    [key in SubSchool]: T;
};
type SubSchoolValuesPartial<T> = {
    [key in SubSchool]?: T;
};
function fillSubSchoolValues<T>(
    values: SubSchoolValuesPartial<T>,
    defaultValue: T,
): SubSchoolValues<T> {
    const full: SubSchoolValuesPartial<T> = {};
    const givenKeys = Object.keys(values);
    for (const k of Object.keys(SubSchool)) {
        const s = k as SubSchool;
        full[s] = givenKeys.includes(k) ? values[s] : defaultValue;
    }
    return full as SubSchoolValues<T>;
}

const breakdownSubSchoolsByParent: SchoolValuesPartial<SubSchool[]> = {};
for (const s of Object.keys(School)) {
    const school = s as School;
    breakdownSubSchoolsByParent[school] = subSchoolsByParent(school);
}

const allSubSchoolsByParent = fillSchoolValues<SubSchool[]>(
    breakdownSubSchoolsByParent,
    [],
);

function tryParseSchool(input: string): School | SubSchool | undefined {
    input = input.toLowerCase();
    const schoolEnum = School[input as keyof typeof School];
    if (schoolEnum) {
        return schoolEnum;
    }
    const subSchoolEnum = SubSchool[input as keyof typeof SubSchool];
    if (subSchoolEnum) {
        return subSchoolEnum;
    }
    return undefined;
}

type SchoolParseResult = { school: School; subSchool?: SubSchool } | undefined;

function fullParseSchool(input: string): SchoolParseResult {
    const school = tryParseSchool(input);
    if (!school) {
        return undefined;
    }
    if (school in School) {
        return { school: school as School };
    }
    const subSchool = school as SubSchool;
    return { school: subSchoolParents[subSchool], subSchool };
}

export type {
    SchoolValues,
    SchoolValuesPartial,
    SubSchoolValues,
    SubSchoolValuesPartial,
};
export {
    subSchoolParents,
    subSchoolsByParent,
    fillSchoolValues,
    fillSubSchoolValues,
    allSubSchoolsByParent,
    tryParseSchool,
    fullParseSchool,
};

import { AsyncAssetResolver } from '.';
import { Class } from '../Creature/Class';
import Race from '../Creature/Race';

async function getRace(
    race: string | Race,
    resolver: AsyncAssetResolver,
): Promise<Race> {
    return race instanceof Race ? race : resolver.resolveRace(race);
}

async function getClass(
    className: string | Class,
    resolver: AsyncAssetResolver,
): Promise<Class> {
    return className instanceof Class
        ? className
        : resolver.resolveClass(className);
}

export { getRace, getClass };

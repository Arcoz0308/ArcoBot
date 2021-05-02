import {User} from "eris";
import {APIUser} from "discord-api-types/v8";

export  function getTag(user: User|APIUser): string {
    return user.username + '#' + user.discriminator;
}
export function optimiseObject(objectToCheck: Record<string, any>, defaultObject: Record<string, any>):  Record<string, any>{
    const newObject = objectToCheck;
    if (isValuesSame(objectToCheck, defaultObject)) return {};
    for (const key in newObject) {
        // eslint-disable-next-line no-prototype-builtins
        if(newObject.hasOwnProperty(key) && defaultObject.hasOwnProperty(key)) {
            if (isValuesSame(newObject[key], defaultObject[key])) delete newObject[key];
            else if (typeof newObject[key] === 'object' && typeof defaultObject[key] === 'object') newObject[key] = optimiseObject(newObject[key], defaultObject[key]);
        }
    }
    return newObject;
}

/**
 * get avatar url
 * @param user the user
 * @param dynamic return gif if is possible
 * @param size size of the image/gif to get
 * @param format format of the image
 */
export function getUserAvatar(user: User|APIUser,dynamic = false, size= 128, format: 'png'|'jpg'|'gif'|'webp' = 'png'): string {
    if (!user.avatar) return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator, 10) % 5}.${format}`;
    if (user.avatar.startsWith('a_') && dynamic) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=${size}`;
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isValuesSame(value1: any,  value2: any): boolean {
    const a = JSON.stringify(value1);
    const b = JSON.stringify(value2);
    return  a === b;
}
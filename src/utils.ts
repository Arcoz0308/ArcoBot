import {User} from "eris";
import {APIUser} from "discord-api-types";

export  function getTag(user: User|APIUser): string {
    return user.username + '#' + user.discriminator;
}
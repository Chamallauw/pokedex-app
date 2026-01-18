import { Type } from "./type.model";

export class Pokemon {
    name: string;
    pokedexId: number;
    types: Type[] = [];
    sprite: string = "";

    constructor(name: string, pokedexId: number) {
        this.name = name;
        this.pokedexId = pokedexId;
    }

    addSprite(sprite: string) {
        this.sprite = sprite;
    }

    addType(type: string) {
        const typeFound = Type.getTypeByName(type);

        if (!this.types.includes(typeFound)) {
            this.types.push(typeFound);
        }
    }

}
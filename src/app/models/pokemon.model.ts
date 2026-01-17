export class Pokemon {
    name: string;
    pokedexId: number;
    types: string[] = [];
    sprite: string = "";

    constructor(name: string, pokedexId: number) {
        this.name = name;
        this.pokedexId = pokedexId;
    }

    addSprite(sprite: string) {
        this.sprite = sprite;
    }

    addType(type: string) {
        if (!this.types.includes(type)) {
            this.types.push(type)
        }
    }

}
import { PokemonStat } from "./pokemon-stat.model";
import { Type } from "../type/type.model";

export class Pokemon {
    name: string;
    pokedexId: number;
    types: Type[] = [];
    baseStats: PokemonStat[] = [];
    // attackTypeId : damageFactor (in factor)
    effectivenessMap: Map<number, number> = new Map();
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

    addBaseStat(stat: PokemonStat) {
        this.baseStats.push(stat);
    }

    setBaseStats(stats: PokemonStat[]) {
        this.baseStats = stats;
    }

    formatPokedexId() : string {
        return Intl.NumberFormat('en-US',{
            minimumIntegerDigits: 4,
            maximumFractionDigits: 0,
            useGrouping: false
        }).format(this.pokedexId);
    }

}
export class PokemonStat {

    public static readonly MIN_VALUE : number = 0;
    public static readonly MAX_VALUE : number = 255;

    constructor(public readonly name: string,
        public readonly value: number
    ) {}

    computeStatPercentage() : number {
        return (this.value / PokemonStat.MAX_VALUE) * 100;
    }

}
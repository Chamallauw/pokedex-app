export class TypeEffectiveness {

    static readonly TYPE_EFFECTIVENESS_COLOR : Map<number,string> = new Map([
        [0,"#cccccc"],
        [0.25,"#3af24b"],
        [0.5,"#aaffaa"],
        [1,"#ffffaa"],
        [2,"#ffaaaa"],
        [4,"#ff5e4d"]
    ])

    // targetTypeId : damageFactor (in factor)
    typeEffectivenessMap: Map<number, number> = new Map();

    constructor(readonly attackTypeId: number) {}

}
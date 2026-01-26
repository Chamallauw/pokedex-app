export class TypeEffectiveness {

    // targetTypeId : damageFactor (in factor)
    typeEffectivenessMap: Map<number, number> = new Map();

    constructor(readonly attackTypeId: number) {}

}
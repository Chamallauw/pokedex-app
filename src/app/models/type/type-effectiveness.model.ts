// targetTypeId : damageFactor (in percentage)
export type EffectivenessMap = { [targetTypeId: number]: number };

export class TypeEffectiveness {

    typeEffectivenessMap: EffectivenessMap = {}

    constructor(readonly attackTypeId: number) {}

}
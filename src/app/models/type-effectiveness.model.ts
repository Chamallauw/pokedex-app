export class TypeEffectiveness {

    public typeEffectivenessTable: {
        [typeId: number]: number;
    } = {}

    constructor(public readonly attackTypeId: number) {}

}
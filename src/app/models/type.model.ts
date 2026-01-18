export class Type {

    static readonly TYPES = [
        new Type("Normal",1,"assets/types/1.png"),
        new Type("Combat",2,"assets/types/2.png"),
        new Type("Vol",3,"assets/types/3.png"),
        new Type("Poison",4,"assets/types/4.png"),
        new Type("Sol",5,"assets/types/5.png"),
        new Type("Roche",6,"assets/types/6.png"),
        new Type("Insecte",7,"assets/types/7.png"),
        new Type("Spectre",8,"assets/types/8.png"),
        new Type("Acier",9,"assets/types/9.png"),
        new Type("Feu",10,"assets/types/10.png"),
        new Type("Eau",11,"assets/types/11.png"),
        new Type("Plante",12,"assets/types/12.png"),
        new Type("Électrik",13,"assets/types/13.png"),
        new Type("Psy",14,"assets/types/14.png"),
        new Type("Glace",15,"assets/types/15.png"),
        new Type("Dragon",16,"assets/types/16.png"),
        new Type("Ténèbres",17,"assets/types/17.png"),
        new Type("Fée",18,"assets/types/18.png")
    ]

    private constructor(public readonly name: string, 
        public readonly id: number,
        public readonly sprite: string
    ) {}

    static getTypeByName(typeName: string) : Type {
        const typeFound = this.TYPES.find((type: Type) => type.name === typeName);
        
        if (typeFound) {
            return typeFound;
        } else {
            return new Type("undefined",0,"undefined");
        }
    }

}
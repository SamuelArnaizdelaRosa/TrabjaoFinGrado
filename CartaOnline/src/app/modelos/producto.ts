export class Producto {
    public description1?:string;
    public description2?:string;
    public description3?:string;
    public description4?:string;
    public number?:number;
    public parent?:number;
    public stock?:boolean;

    constructor(description1?:string,description2?:string,description3?:string,description4?:string,number?:number,parent?:number,stock:boolean=true){
        this.description1=description1;
        this.description2=description2;
        this.description3=description3;
        this.description4=description4;
        this.number=number;
        this.parent=parent;
        this.stock = stock;
    }
}

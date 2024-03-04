export class Box<Data>{
    constructor(
        protected readonly _data:Data,
    ){
    }
    getData(){
        return this._data;
    }
}


export function Pick<ObjectType>(object:Readonly<ObjectType>,keys:Readonly<(keyof ObjectType)[]>):Partial<ObjectType>{
    const result:Partial<ObjectType> = {};
    for(const key of keys){
        result[key] = object[key];
    }
    return result;
}
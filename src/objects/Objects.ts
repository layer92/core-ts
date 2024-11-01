
type PickedType<Source,Key extends keyof Source> = {
    [key in Key]:Source[key]
};

/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
export function Pick<SourceObject,Key extends keyof SourceObject>(object:Readonly<SourceObject>,keys:Readonly<Key[]>):PickedType<SourceObject,Key>{
    const result:Partial<PickedType<SourceObject,Key>> = {};
    for(const key of keys){
        result[key] = object[key];
    }
    return result as PickedType<SourceObject,Key>;
}


/** Returns a version of the source object that only has the picked keys, or fewer. Keys that aren't in the source object won't be included in the returned object. */
export function PickPartial<SourceObject,Key extends keyof any>(object:Readonly<SourceObject>,keys:Readonly<Key[]>):PickedType<any,Key&(keyof SourceObject)>{
    const result:Partial<PickedType<any,Key>> = {};
    for(const key of keys){
        if(key in object){
            result[key] = object[key as any];
        }
    }
    return result as PickedType<SourceObject,Key&(keyof SourceObject)>;
}


type PickedType<Source,Key extends keyof Source> = {
    [key in Key]:Source[key]
};

export function Pick<SourceObject,Key extends keyof SourceObject>(object:Readonly<SourceObject>,keys:Readonly<Key[]>):PickedType<SourceObject,Key>{
    const result:Partial<PickedType<SourceObject,Key>> = {};
    for(const key of keys){
        result[key] = object[key];
    }
    return result as PickedType<SourceObject,Key>;
}
type PickedType<Source, Key extends keyof Source> = {
    [key in Key]: Source[key];
};
/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
export declare function Pick<SourceObject, Key extends keyof SourceObject>(object: Readonly<SourceObject>, keys: Readonly<Key[]>): PickedType<SourceObject, Key>;
/** Returns a version of the source object that only has picked keys, but doesn't necessarily have all of those keys, or fewer. Keys that aren't in the source object won't be included in the returned object. */
export declare function PickIntersection<SourceObject, Key extends keyof any>(object: Readonly<SourceObject>, keys: Readonly<Key[]>): PickedType<any, Key & (keyof SourceObject)>;
export {};

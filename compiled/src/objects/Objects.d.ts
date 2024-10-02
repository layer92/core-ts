type PickedType<Source, Key extends keyof Source> = {
    [key in Key]: Source[key];
};
export declare function Pick<SourceObject, Key extends keyof SourceObject>(object: Readonly<SourceObject>, keys: Readonly<Key[]>): PickedType<SourceObject, Key>;
export {};

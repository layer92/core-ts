import { Relation } from "./Relation";
import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare function UnboxArray<Item extends Box<any>>(array: Item[]): any[];
export declare function DoesArrayInclude<Item>(array: Item[], item: Item, compare?: Relation): boolean;
export declare function PushIfNotIncludes<Item>(array: Item[], item: Item, compare?: Relation): void;
export declare function PushManyIfNotIncludes<Item>(array: Item[], itemsToPush: Item[], compare?: Relation): void;
export declare function GetFirstItem<Item>(array: Item[]): Item;
export declare function GetLastItem<Item>(array: Item[]): Item;
export declare function MaybeGetLastItem<Item>(array: Item[]): Item;
export declare function GetRandomItem<Item>(array: Item[]): Item;
export declare function RemoveAnyFromEndOfArray<Item>(array: Item[], removeItem: Item, compare?: Relation): Item[];
/** Return a version of the array without duplicates. Array is in the same order, and in the case of a duplicate, all occurrences after the first are removed. */
export declare function MakeUniqueArray<Item>(array: Item[], compare?: Relation<Item>): Item[];
/** Returns this array, excluding any items that appear in itemsToExclude. */
export declare function GetArrayExclusion<Item>(array: Item[], itemsToExclude: any[], compare?: Relation): Item[];
/** Returns the elements that are present in both arrays. */
export declare function GetArrayIntersection<Item>(array: Item[], b: any[], compare?: Relation): Item[];
export declare function DoArraysIntersect(a: any[], b: any[], compare?: Relation): boolean;
export declare function GetItemByIndex<Item>(array: Item[], index: number): Item;
export declare function ExpectIndexIsInRange(array: any[], index: number, onOutOfRange?: OnException): void;
export declare function DoesArrayContainDuplicates(array: any[], compare?: Relation): boolean;
export declare function GetArraySum(array: any[]): any;
export declare function GetArrayAverage(array: any[]): number;
export declare function GetArrayMax(array: any[]): number;
export declare function GetArrayMin(array: any[]): number;
export declare function GetRelativeItem<Item>(array: Item[], fromItem: Item, offset: number, loop: boolean): Item;
export declare function GetNextItemInCycle<Item>(array: Item[], fromItem: Item): any;
export declare function GetPreviousItemInCycle<Item>(array: Item[], fromItem: Item): any;
/** Throws an error if the item isn't in the array. */
export declare function GetIndexByItem<Item>(array: Item[], item: Item): number;
/** If the item is included in the array, removes it from the array. If the item isn't include in the array, pushes it to the array. */
export declare function ToggleInclusion<Item>(array: Item[], item: Item, compare?: Relation): Item[];
/** DEPRECATED: Use individual utility functions instead to encourage better tree-shaking. */
export declare class Arrays {
    static UnboxArray: typeof UnboxArray;
    static Includes: typeof DoesArrayInclude;
    static PushIfNotIncludes: typeof PushIfNotIncludes;
    static GetFirst: typeof GetFirstItem;
    static GetLast: typeof GetLastItem;
    static MaybeGetLast: typeof MaybeGetLastItem;
    static RemoveAnyFromEnd: typeof RemoveAnyFromEndOfArray;
    static GetRandom: typeof GetRandomItem;
    static PushManyIfNotIncludes: typeof PushManyIfNotIncludes;
    static MakeUnique: typeof MakeUniqueArray;
    static GetExclusion: typeof GetArrayExclusion;
    static GetIntersection: typeof GetArrayIntersection;
    static Intersects: typeof DoArraysIntersect;
    static GetItem: typeof GetItemByIndex;
    static ExpectIndexIsInRange: typeof ExpectIndexIsInRange;
    static ContainsDuplicates: typeof DoesArrayContainDuplicates;
    static GetSum: typeof GetArraySum;
    static GetAverage: typeof GetArrayAverage;
    static GetMax: typeof GetArrayMax;
    static GetMin: typeof GetArrayMin;
    static GetRelativeItem: typeof GetRelativeItem;
    static GetNextItemInCycle: typeof GetNextItemInCycle;
    static GetPreviousItemInCycle: typeof GetPreviousItemInCycle;
    static GetIndex: typeof GetIndexByItem;
    static ToggleInclusion: typeof ToggleInclusion;
}

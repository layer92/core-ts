import { Relation } from "./Relation";
import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare function UnboxArray<Item extends Box<any>>(array: Readonly<Item[]>): any[];
export declare function DoesArrayInclude<Item>(array: Readonly<Item[]>, item: Item | Readonly<Item>, compare?: Relation): boolean;
export declare function PushIfNotIncludes<Item>(array: Item[], item: Item | Readonly<Item>, compare?: Relation): void;
export declare function PushManyIfNotIncludes<Item>(array: Item[], itemsToPush: Readonly<Item[]>, compare?: Relation): void;
export declare function GetFirstItem<Item>(array: Readonly<Item[]>): Item;
export declare function GetLastItem<Item>(array: Readonly<Item[]>): Item;
export declare function MaybeGetLastItem<Item>(array: Readonly<Item[]>): Item;
export declare function GetRandomItem<Item>(array: Readonly<Item[]>): Item;
export declare function GetButRemoveAnyFromEndOfArray<Item>(array: Readonly<Item[]>, removeItem: Item | Readonly<Item>, compare?: Relation): Item[];
/** Return a version of the array without duplicates. Array is in the same order, and in the case of a duplicate, all occurrences after the first are removed. */
export declare function MakeUniqueArray<Item>(array: Readonly<Item[]>, compare?: Relation<Item>): Item[];
/** Returns this array, excluding any items that appear in itemsToExclude. */
export declare function GetArrayExclusion<Item>(array: Readonly<Item[]>, itemsToExclude: Readonly<any[]>, compare?: Relation): Item[];
/** Returns the elements that are present in both arrays. */
export declare function GetArrayIntersection<Item>(array: Readonly<Item[]>, b: Readonly<any[]>, compare?: Relation): Item[];
export declare function DoArraysIntersect(a: Readonly<any[]>, b: Readonly<any[]>, compare?: Relation): boolean;
export declare function GetItemByIndex<Item>(array: Readonly<Item[]>, index: number): Item;
export declare function ExpectIndexIsInRange(array: Readonly<any[]>, index: number, onOutOfRange?: OnException): void;
export declare function DoesArrayContainDuplicates(array: Readonly<any[]>, compare?: Relation): boolean;
export declare function GetArraySum(array: Readonly<any[]>): any;
export declare function GetArrayAverage(array: Readonly<any[]>): number;
export declare function GetArrayMax(array: Readonly<any[]>): number;
export declare function GetArrayMin(array: Readonly<any[]>): number;
export declare function GetRelativeItem<Item>(array: Readonly<Item[]>, fromItem: Item | Readonly<Item>, offset: number, loop: boolean): Item;
export declare function GetNextItemInCycle<Item>(array: Readonly<Item[]>, fromItem: Item): Item;
export declare function GetPreviousItemInCycle<Item>(array: Readonly<Item[]>, fromItem: Item): Item;
/** Throws an error if the item isn't in the array. */
export declare function GetIndexByItem<Item>(array: Readonly<Item[]>, item: Item): number;
/** If the item is included in the array, removes it from the array. If the item isn't include in the array, pushes it to the array. */
export declare function ToggleInclusion<Item>(array: Item[], item: Item, compare?: Relation): Item[];
/** faster than ArrayEquals, but requires the arrays to be sorted */
export declare function SortedArrayEquals<Item>(a: Readonly<Item[]>, b: Readonly<Item[]>, compare?: Relation): boolean;
/** if the arrays are sorted, use SortedArrayEquals, which is faster */
export declare function ArrayEquals<Item>(a: Readonly<Item[]>, b: Readonly<Item[]>, compare?: Relation): boolean;

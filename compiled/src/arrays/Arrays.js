"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayToMatrix = exports.FilterAsync = exports.MapAsync = exports.MakeRotatedArray = exports.MakePowerSet = exports.UnsortedArrayEquals = exports.SortedArrayEquals = exports.ToggleInclusion = exports.GetIndexByItem = exports.GetPreviousItemInCycle = exports.GetNextItemInCycle = exports.GetRelativeItem = exports.GetArrayMin = exports.GetIndexOfMinItem = exports.GetIndexOfMaxItem = exports.GetArrayMax = exports.GetArrayAverage = exports.GetArraySum = exports.DoesArrayContainDuplicates = exports.ExpectIndexIsInRange = exports.MaybeRemoveItem = exports.RemoveItem = exports.MaybeRemoveItems = exports.RemoveItems = exports.GetItemByIndex = exports.DoArraysIntersect = exports.GetArrayIntersection = exports.GetArrayExclusion = exports.MakeUniqueArray = exports.GetButRemoveAnyFromEndOfArray = exports.GetRandomItem = exports.MaybeGetLastItem = exports.GetLastItem = exports.GetFirstItem = exports.PushMany = exports.PushManyIfNotIncludes = exports.PushIfNotIncludes = exports.DoesArrayInclude = void 0;
const EqualsByThreeEquals_1 = require("./EqualsByThreeEquals");
const Expect_1 = require("../away/Expect");
const Modulo_1 = require("../math/Modulo");
// export function UnboxArray<Item extends Box<any>>(array:Readonly<Item[]>) {
//     return array.map(a=>a.getData());
// }
function DoesArrayInclude(array, item, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    return array.some(a => compare(a, item));
}
exports.DoesArrayInclude = DoesArrayInclude;
function PushIfNotIncludes(array, item, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (!DoesArrayInclude(array, item, compare)) {
        array.push(item);
    }
}
exports.PushIfNotIncludes = PushIfNotIncludes;
function PushManyIfNotIncludes(array, itemsToPush, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    for (const aItem of itemsToPush) {
        PushIfNotIncludes(array, aItem, compare);
    }
}
exports.PushManyIfNotIncludes = PushManyIfNotIncludes;
/** Equivalent to `array.push(...itemsToPush)`, except it works even with large arrays. */
function PushMany(array, itemsToPush) {
    for (const aItem of itemsToPush) {
        array.push(aItem);
    }
}
exports.PushMany = PushMany;
function GetFirstItem(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    return array[0];
}
exports.GetFirstItem = GetFirstItem;
function GetLastItem(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    return array.slice(-1)[0];
}
exports.GetLastItem = GetLastItem;
function MaybeGetLastItem(array) {
    return array.slice(-1)[0];
}
exports.MaybeGetLastItem = MaybeGetLastItem;
function GetRandomItem(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}
exports.GetRandomItem = GetRandomItem;
function GetButRemoveAnyFromEndOfArray(array, removeItem, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (array.length === 0) {
        return [];
    }
    let rightIndex = array.length - 1;
    while (compare(array[rightIndex], removeItem)) {
        --rightIndex;
    }
    return array.slice(0, rightIndex);
}
exports.GetButRemoveAnyFromEndOfArray = GetButRemoveAnyFromEndOfArray;
/** Return a version of the array without duplicates. Array is in the same order, and in the case of a duplicate, all occurrences after the first are removed. */
function MakeUniqueArray(array, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    const result = [];
    for (const a of array) {
        PushIfNotIncludes(result, a, compare);
    }
    return result;
}
exports.MakeUniqueArray = MakeUniqueArray;
/** Returns this array, excluding any items that appear in itemsToExclude. */
function GetArrayExclusion(array, itemsToExclude, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    const exclusion = [];
    for (const a of array) {
        if (!DoesArrayInclude(itemsToExclude, a, compare)) {
            exclusion.push(a);
        }
    }
    return exclusion;
}
exports.GetArrayExclusion = GetArrayExclusion;
/** Returns the elements that are present in both arrays. */
function GetArrayIntersection(array, b, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    const intersection = [];
    for (const a of array) {
        if (DoesArrayInclude(b, a, compare)) {
            intersection.push(a);
        }
    }
    return intersection;
}
exports.GetArrayIntersection = GetArrayIntersection;
function DoArraysIntersect(a, b, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    return GetArrayIntersection(a, b, compare).length !== 0;
}
exports.DoArraysIntersect = DoArraysIntersect;
function GetItemByIndex(array, index) {
    ExpectIndexIsInRange(array, index);
    return array[index];
}
exports.GetItemByIndex = GetItemByIndex;
function RemoveItems(array, items) {
    // TODO: optimize
    for (const item of items) {
        RemoveItem(array, item);
    }
}
exports.RemoveItems = RemoveItems;
function MaybeRemoveItems(array, items) {
    if (!array.length) {
        return;
    }
    // TODO: optimize
    for (const item of items) {
        MaybeRemoveItem(array, item);
    }
}
exports.MaybeRemoveItems = MaybeRemoveItems;
function RemoveItem(array, item) {
    const index = array.indexOf(item);
    (0, Expect_1.Expect)(index >= 0, `Item not found in array.`);
    array.splice(index, 1);
}
exports.RemoveItem = RemoveItem;
function MaybeRemoveItem(array, item) {
    const index = array.indexOf(item);
    if (index === -1) {
        return;
    }
    array.splice(index, 1);
}
exports.MaybeRemoveItem = MaybeRemoveItem;
function ExpectIndexIsInRange(array, index, onOutOfRange) {
    const makeMessage = () => `Index out of range: ${index}`;
    (0, Expect_1.Expect)(index >= 0, makeMessage, onOutOfRange);
    (0, Expect_1.Expect)(index < array.length, makeMessage, onOutOfRange);
}
exports.ExpectIndexIsInRange = ExpectIndexIsInRange;
function DoesArrayContainDuplicates(array, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    for (const aItem of array) {
        const matchingItems = array.filter(b => compare(aItem, b));
        if (matchingItems.length > 1) {
            return true;
        }
    }
    return false;
}
exports.DoesArrayContainDuplicates = DoesArrayContainDuplicates;
function GetArraySum(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    return array.reduce((sum, current) => sum + current, 0);
}
exports.GetArraySum = GetArraySum;
function GetArrayAverage(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    return GetArraySum(array) / array.length;
}
exports.GetArrayAverage = GetArrayAverage;
function GetArrayMax(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    let max = array[0];
    for (const a of array) {
        if (a > max) {
            max = a;
        }
    }
    return max;
}
exports.GetArrayMax = GetArrayMax;
function GetIndexOfMaxItem(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    let maxIndex = 0;
    let max = array[0];
    const length = array.length;
    for (let i = 0; i < length; ++i) {
        for (const a of array) {
            if (a[i] > max) {
                max = a[i];
                maxIndex = i;
            }
        }
    }
    return maxIndex;
}
exports.GetIndexOfMaxItem = GetIndexOfMaxItem;
function GetIndexOfMinItem(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    let minIndex = 0;
    let min = array[0];
    const length = array.length;
    for (let i = 0; i < length; ++i) {
        for (const a of array) {
            if (a[i] < min) {
                min = a[i];
                minIndex = i;
            }
        }
    }
    return minIndex;
}
exports.GetIndexOfMinItem = GetIndexOfMinItem;
function GetArrayMin(array) {
    (0, Expect_1.Expect)(array.length, "Array was empty.");
    let min = array[0];
    for (const a of array) {
        if (a < min) {
            min = a;
        }
    }
    return min;
}
exports.GetArrayMin = GetArrayMin;
function GetRelativeItem(array, fromItem, offset, loop) {
    let index = GetIndexByItem(array, fromItem) + offset;
    if (loop) {
        index = (0, Modulo_1.Modulo)(index, array.length);
    }
    else {
        ExpectIndexIsInRange(array, index);
    }
    return array[index];
}
exports.GetRelativeItem = GetRelativeItem;
function GetNextItemInCycle(array, fromItem) {
    return GetRelativeItem(array, fromItem, 1, true);
}
exports.GetNextItemInCycle = GetNextItemInCycle;
function GetPreviousItemInCycle(array, fromItem) {
    return GetRelativeItem(array, fromItem, -1, true);
}
exports.GetPreviousItemInCycle = GetPreviousItemInCycle;
/** Throws an error if the item isn't in the array. */
function GetIndexByItem(array, item) {
    const oldIndex = array.indexOf(item);
    (0, Expect_1.Expect)(oldIndex !== -1, `Item not found in array.`);
    return oldIndex;
}
exports.GetIndexByItem = GetIndexByItem;
/** If the item is included in the array, removes it from the array. If the item isn't include in the array, pushes it to the array. */
function ToggleInclusion(array, item, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (DoesArrayInclude(array, item, compare)) {
        array = array.filter(a => !compare(a, item));
    }
    else {
        array = array.slice();
        array.push(item);
    }
    return array;
}
exports.ToggleInclusion = ToggleInclusion;
/** Returns true if the arrays have the same items in the same order. */
function SortedArrayEquals(a, b, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (a.length !== b.length) {
        return false;
    }
    const length = a.length;
    for (let i = 0; i < length; ++i) {
        if (!compare(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
exports.SortedArrayEquals = SortedArrayEquals;
/** Returns true if the arrays have the same items, regardless of order. This is slower than SortedArrayEquals, so if you are able to gaurantee your specimens will be sorted, it is suggested to use SortedArrayEquals instead. */
function UnsortedArrayEquals(a, b, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (a.length !== b.length) {
        return false;
    }
    const a2 = a.slice();
    const b2 = b.slice();
    while (a2.length) {
        const itemA = a2.pop();
        const matchIndex = b2.findIndex(itemB => compare(itemA, itemB));
        if (matchIndex === -1) {
            return false;
        }
        b2.splice(matchIndex, 1);
    }
    return true;
}
exports.UnsortedArrayEquals = UnsortedArrayEquals;
/**
 * Returns an array of all possible subsets of the array.
 * See https://en.wikipedia.org/wiki/Power_set
 * */
function MakePowerSet(array) {
    const result = [[]];
    // each pass adds a layer of subsets, each time introducing one new element
    // for example, for the array [1,2,3]
    // result starts as [ [] ]
    // the first pass makes [ [],[1] ]
    // the second pass makes [ [],[1], [2],[1,2] ]
    // the third pass makes [ [],[1],[2],[1,2], [3],[1,3],[2,3],[1,2,3] ]
    for (const a of array) {
        const lengthAtStartOfPass = result.length;
        for (let i = 0; i < lengthAtStartOfPass; ++i) {
            // result.push([ ...result[i], a ]); // using slice instead (see notes below)
            const subset = result[i].slice();
            subset.push(a);
            result.push(subset);
        }
    }
    return result;
    // consulted: https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array
    /**
     * for choosing slice over spread, may be faster https://stackoverflow.com/questions/55843097/does-spread-operator-affect-performance, https://stackoverflow.com/questions/51164161/spread-syntax-vs-slice-method
     * my results from https://stackoverflow.com/questions/55843097/does-spread-operator-affect-performance:
     * spread: 261.1 ms
        map: 228 ms
        for: 298.7 ms
        reduce: 273.2 ms
        slice: 29.5 ms
        arrayFrom: 249.4 ms
             */
}
exports.MakePowerSet = MakePowerSet;
/**
 *
 * @param array
 * @param offset The offset to apply to the index of each element of the array. Default is -1, which moves all elements 1 position closer to the front of the array (moving the last element to the end of the array)
 * @returns
 */
function MakeRotatedArray(array, offset = -1) {
    if (offset === 0) {
        return array.slice();
    }
    const length = array.length;
    const result = [];
    for (let fromIndex = 0; fromIndex < length; ++fromIndex) {
        const toIndex = (0, Modulo_1.Modulo)(fromIndex + offset, length);
        result[toIndex] = array[fromIndex];
    }
    return result;
    // it might be faster to use array.slice() than the above method (for example if the browser implements slice natively), but the above algorithm is just fine in linear time
}
exports.MakeRotatedArray = MakeRotatedArray;
/** Calls and awaits the callback for each item, consecutively.  */
async function MapAsync(array, callback) {
    const result = [];
    for (let i = 0, n = array.length; i < n; ++i) {
        result.push(await callback(array[i], i));
    }
    return result;
}
exports.MapAsync = MapAsync;
/** Calls and awaits the callback for each item, consecutively.  */
async function FilterAsync(array, callback) {
    const result = [];
    let item;
    for (let i = 0, n = array.length; i < n; ++i) {
        item = array[i];
        if (await callback(item, i)) {
            result.push(item);
        }
    }
    return result;
}
exports.FilterAsync = FilterAsync;
/** Given array and width, returns a matrix with the specified width. Eg ([1,2,3,4,5,6,7,8], 3) --> [[1,2,3], [4,5,6], [7,8]] */
function ArrayToMatrix(array, width) {
    const result = [];
    let row = [];
    result.push(row);
    for (let i = 0, n = array.length; i < n; ++i) {
        row.push(array[i]);
        if (row.length === width) {
            row = [];
            result.push(row);
        }
    }
    return result;
}
exports.ArrayToMatrix = ArrayToMatrix;

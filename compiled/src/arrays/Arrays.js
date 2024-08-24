"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayEquals = exports.SortedArrayEquals = exports.ToggleInclusion = exports.GetIndexByItem = exports.GetPreviousItemInCycle = exports.GetNextItemInCycle = exports.GetRelativeItem = exports.GetArrayMin = exports.GetArrayMax = exports.GetArrayAverage = exports.GetArraySum = exports.DoesArrayContainDuplicates = exports.ExpectIndexIsInRange = exports.GetItemByIndex = exports.DoArraysIntersect = exports.GetArrayIntersection = exports.GetArrayExclusion = exports.MakeUniqueArray = exports.GetButRemoveAnyFromEndOfArray = exports.GetRandomItem = exports.MaybeGetLastItem = exports.GetLastItem = exports.GetFirstItem = exports.PushManyIfNotIncludes = exports.PushIfNotIncludes = exports.DoesArrayInclude = exports.UnboxArray = void 0;
const EqualsByThreeEquals_1 = require("./EqualsByThreeEquals");
const Expect_1 = require("../away/Expect");
const Modulo_1 = require("../math/Modulo");
function UnboxArray(array) {
    return array.map(a => a.getData());
}
exports.UnboxArray = UnboxArray;
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
/** faster than ArrayEquals, but requires the arrays to be sorted */
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
/** if the arrays are sorted, use SortedArrayEquals, which is faster */
function ArrayEquals(a, b, compare = EqualsByThreeEquals_1.EqualsByThreeEquals) {
    if (a.length !== b.length) {
        return false;
    }
    const a2 = a.slice();
    const b2 = b.slice();
    while (a.length) {
        const itemA = a2.pop();
        const matchIndex = b2.findIndex(itemB => compare(itemA, itemB));
        if (matchIndex === -1) {
            return false;
        }
        b2.splice(matchIndex, 1);
    }
    return true;
}
exports.ArrayEquals = ArrayEquals;

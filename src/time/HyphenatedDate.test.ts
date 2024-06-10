import assert = require("assert");

import {HyphenDateToUnixWeekDays, GetDifferenceWeekdaysBetweenHyphenDates, GetDifferenceDaysBetweenHyphenDates, GetNetWorkDaysBetweenHyphenDates, UnixTimeToHyphenDate} from "./HyphenatedDate";

const _2019_01_01 = ("2019-01-01");
const Wed_2020_01_01 = ("2020-01-01");
const Thu_2020_01_02 = ("2020-01-02");
const Fri_2020_01_03 = ("2020-01-03");
const Sat_2020_01_04 = ("2020-01-04");
const Sun_2020_01_05 = ("2020-01-05");
const Mon_2020_01_06 = ("2020-01-06");
const Tue_2020_01_07 = ("2020-01-07");
const Wed_2020_01_08 = ("2020-01-08");
const Thu_2020_01_09 = ("2020-01-09");
const Fri_2020_01_10 = ("2020-01-10");
const _2020_02_01 = ("2020-02-01");
const _2020_02_10 = ("2020-02-10");
const _2021_01_01 = ("2021-01-01");

const _1969_12_30 = ("1969-12-30");
const _1969_12_31 = ("1969-12-31");
const Thu_1970_01_01 = ("1970-01-01");
const Fri_1970_01_02 = ("1970-01-02");
const Sat_1970_01_03 = ("1970-01-03");
const Sun_1970_01_04 = ("1970-01-04");
const Mon_1970_01_05 = ("1970-01-05");
const Tue_1970_01_06 = ("1970-01-06");
const Wed_1970_01_07 = ("1970-01-07");
const Thu_1970_01_08 = ("1970-01-08");
const Fri_1970_01_09 = ("1970-01-09");
const Sat_1970_01_10 = ("1970-01-10");
const Sun_1970_01_11 = ("1970-01-11");
const Mon_1970_01_12 = ("1970-01-12");
const Tue_1970_01_13 = ("1970-01-13");
const Wed_1970_01_14 = ("1970-01-14");
const Thu_1970_01_15 = ("1970-01-15");
const Fri_1970_01_16 = ("1970-01-16");
const Sat_1970_01_17 = ("1970-01-17");
const Sun_1970_01_18 = ("1970-01-18");
const Mon_1970_01_19 = ("1970-01-19");
const Tue_1970_01_20 = ("1970-01-20");

export function TestHyphenatedDate() {
    console.log("\t HyphenatedDateBox");
    TestFromUnixTime();
    TestGetDifferenceDays();
    TestToUnixWeekDays();
    TestGetDifferenceWeekdays();
    TestGetNetWorkDays();
}

function TestFromUnixTime(){
    console.log(`\t\t .FromUnixTime`);
    // Monday, March 11, 2024 11:04:48 PM
    const unixTime = 1710198288;    
    const date = UnixTimeToHyphenDate(unixTime);
    assert.equal(date,"2024-03-11");
}

function TestToUnixWeekDays(){
    console.log(`\t\t HyphenDateToUnixWeekDays`);
    assert.equal(HyphenDateToUnixWeekDays(Thu_1970_01_01),0);
    assert.equal(HyphenDateToUnixWeekDays(Fri_1970_01_02),1);
    assert.equal(HyphenDateToUnixWeekDays(Sat_1970_01_03),2);
    assert.equal(HyphenDateToUnixWeekDays(Sun_1970_01_04),2);
    assert.equal(HyphenDateToUnixWeekDays(Mon_1970_01_05),2);
    assert.equal(HyphenDateToUnixWeekDays(Tue_1970_01_06),3);
    assert.equal(HyphenDateToUnixWeekDays(Wed_1970_01_07),4);
    assert.equal(HyphenDateToUnixWeekDays(Thu_1970_01_08),5);
    assert.equal(HyphenDateToUnixWeekDays(Fri_1970_01_09),6);
    assert.equal(HyphenDateToUnixWeekDays(Sat_1970_01_10),7);
    assert.equal(HyphenDateToUnixWeekDays(Sun_1970_01_11),7);
    assert.equal(HyphenDateToUnixWeekDays(Mon_1970_01_12),7);
    assert.equal(HyphenDateToUnixWeekDays(Tue_1970_01_13),8);
    assert.equal(HyphenDateToUnixWeekDays(Wed_1970_01_14),9);
    assert.equal(HyphenDateToUnixWeekDays(Thu_1970_01_15),10);
    assert.equal(HyphenDateToUnixWeekDays(Fri_1970_01_16),11);
    assert.equal(HyphenDateToUnixWeekDays(Sat_1970_01_17),12);
    assert.equal(HyphenDateToUnixWeekDays(Sun_1970_01_18),12);
    assert.equal(HyphenDateToUnixWeekDays(Mon_1970_01_19),12);
    assert.equal(HyphenDateToUnixWeekDays(Tue_1970_01_20),13);
}

function TestGetDifferenceDays(){
    console.log(`\t\t GetHyphenDateDifferenceDays`);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Fri_2020_01_10, Wed_2020_01_01), 9);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Wed_2020_01_01, Fri_2020_01_10), -9);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Wed_2020_01_01, _2019_01_01), 365);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(_2021_01_01, Wed_2020_01_01), 366);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Thu_1970_01_01, Thu_1970_01_01), 0);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Thu_1970_01_01, _1969_12_31), 1);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(Thu_1970_01_01, _1969_12_30), 2);
    assert.equal(GetDifferenceDaysBetweenHyphenDates(_1969_12_31, _1969_12_30), 1);
}

function TestGetDifferenceWeekdays(){
    console.log(`\t\t GetDifferenceWeekdaysFromHyphenDate`);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Thu_1970_01_01, Thu_1970_01_01), 0);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Fri_1970_01_02, Thu_1970_01_01), 1);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sat_1970_01_03, Thu_1970_01_01), 2);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sun_1970_01_04, Thu_1970_01_01), 2);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Mon_1970_01_05, Thu_1970_01_01), 2);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Tue_1970_01_06, Thu_1970_01_01), 3);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Wed_1970_01_07, Thu_1970_01_01), 4);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Thu_1970_01_08, Thu_1970_01_01), 5);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Fri_1970_01_09, Thu_1970_01_01), 6);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sat_1970_01_10, Thu_1970_01_01), 7);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sun_1970_01_11, Thu_1970_01_01), 7);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Mon_1970_01_12, Thu_1970_01_01), 7);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Tue_1970_01_13, Thu_1970_01_01), 8);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Wed_1970_01_14, Thu_1970_01_01), 9);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Thu_1970_01_15, Thu_1970_01_01), 10);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Fri_1970_01_16, Thu_1970_01_01), 11);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sat_1970_01_17, Thu_1970_01_01), 12);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sun_1970_01_18, Thu_1970_01_01), 12);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Mon_1970_01_19, Thu_1970_01_01), 12);

    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Tue_1970_01_06, Tue_1970_01_06), 0);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Wed_1970_01_07, Tue_1970_01_06), 1);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Thu_1970_01_08, Tue_1970_01_06), 2);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Fri_1970_01_09, Tue_1970_01_06), 3);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sat_1970_01_10, Tue_1970_01_06), 4);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sun_1970_01_11, Tue_1970_01_06), 4);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Mon_1970_01_12, Tue_1970_01_06), 4);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Tue_1970_01_13, Tue_1970_01_06), 5);

    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Wed_2020_01_01, Wed_2020_01_01), 0);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Thu_2020_01_02, Wed_2020_01_01), 1);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Fri_2020_01_03, Wed_2020_01_01), 2);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sat_2020_01_04, Wed_2020_01_01), 3);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Sun_2020_01_05, Wed_2020_01_01), 3);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Mon_2020_01_06, Wed_2020_01_01), 3);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Tue_2020_01_07, Wed_2020_01_01), 4);
    assert.equal(GetDifferenceWeekdaysBetweenHyphenDates(Wed_2020_01_08, Wed_2020_01_01), 5);
}

function TestGetNetWorkDays(){
    console.log(`\t\t GetNetWorkDaysBetweenHyphenDates`);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Wed_2020_01_01), 1);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Thu_2020_01_02), 2);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Fri_2020_01_03), 3);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Sat_2020_01_04), 3);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Sun_2020_01_05), 3);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Mon_2020_01_06), 4);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Tue_2020_01_07), 5);
    assert.equal(GetNetWorkDaysBetweenHyphenDates(Wed_2020_01_01, Wed_2020_01_08), 6);
}
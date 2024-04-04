import assert = require("assert");
import { HyphenatedDateBox } from "./HyphenatedDateBox";

const _2019_01_01 = new HyphenatedDateBox("2019-01-01");
const Wed_2020_01_01 = new HyphenatedDateBox("2020-01-01");
const Thu_2020_01_02 = new HyphenatedDateBox("2020-01-02");
const Fri_2020_01_03 = new HyphenatedDateBox("2020-01-03");
const Sat_2020_01_04 = new HyphenatedDateBox("2020-01-04");
const Sun_2020_01_05 = new HyphenatedDateBox("2020-01-05");
const Mon_2020_01_06 = new HyphenatedDateBox("2020-01-06");
const Tue_2020_01_07 = new HyphenatedDateBox("2020-01-07");
const Wed_2020_01_08 = new HyphenatedDateBox("2020-01-08");
const Thu_2020_01_09 = new HyphenatedDateBox("2020-01-09");
const Fri_2020_01_10 = new HyphenatedDateBox("2020-01-10");
const _2020_02_01 = new HyphenatedDateBox("2020-02-01");
const _2020_02_10 = new HyphenatedDateBox("2020-02-10");
const _2021_01_01 = new HyphenatedDateBox("2021-01-01");

const _1969_12_30 = new HyphenatedDateBox("1969-12-30");
const _1969_12_31 = new HyphenatedDateBox("1969-12-31");
const Thu_1970_01_01 = new HyphenatedDateBox("1970-01-01");
const Fri_1970_01_02 = new HyphenatedDateBox("1970-01-02");
const Sat_1970_01_03 = new HyphenatedDateBox("1970-01-03");
const Sun_1970_01_04 = new HyphenatedDateBox("1970-01-04");
const Mon_1970_01_05 = new HyphenatedDateBox("1970-01-05");
const Tue_1970_01_06 = new HyphenatedDateBox("1970-01-06");
const Wed_1970_01_07 = new HyphenatedDateBox("1970-01-07");
const Thu_1970_01_08 = new HyphenatedDateBox("1970-01-08");
const Fri_1970_01_09 = new HyphenatedDateBox("1970-01-09");
const Sat_1970_01_10 = new HyphenatedDateBox("1970-01-10");
const Sun_1970_01_11 = new HyphenatedDateBox("1970-01-11");
const Mon_1970_01_12 = new HyphenatedDateBox("1970-01-12");
const Tue_1970_01_13 = new HyphenatedDateBox("1970-01-13");
const Wed_1970_01_14 = new HyphenatedDateBox("1970-01-14");
const Thu_1970_01_15 = new HyphenatedDateBox("1970-01-15");
const Fri_1970_01_16 = new HyphenatedDateBox("1970-01-16");
const Sat_1970_01_17 = new HyphenatedDateBox("1970-01-17");
const Sun_1970_01_18 = new HyphenatedDateBox("1970-01-18");
const Mon_1970_01_19 = new HyphenatedDateBox("1970-01-19");
const Tue_1970_01_20 = new HyphenatedDateBox("1970-01-20");

export function TestHyphenatedDateBox() {
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
    const dateBox = HyphenatedDateBox.FromUnixTime(unixTime);
    assert.equal(dateBox.getData(),"2024-03-11");
}

function TestToUnixWeekDays(){
    console.log(`\t\t .toUnixWeekDays`);
    assert.equal(Thu_1970_01_01.toUnixWeekDays(),0);
    assert.equal(Fri_1970_01_02.toUnixWeekDays(),1);
    assert.equal(Sat_1970_01_03.toUnixWeekDays(),2);
    assert.equal(Sun_1970_01_04.toUnixWeekDays(),2);
    assert.equal(Mon_1970_01_05.toUnixWeekDays(),2);
    assert.equal(Tue_1970_01_06.toUnixWeekDays(),3);
    assert.equal(Wed_1970_01_07.toUnixWeekDays(),4);
    assert.equal(Thu_1970_01_08.toUnixWeekDays(),5);
    assert.equal(Fri_1970_01_09.toUnixWeekDays(),6);
    assert.equal(Sat_1970_01_10.toUnixWeekDays(),7);
    assert.equal(Sun_1970_01_11.toUnixWeekDays(),7);
    assert.equal(Mon_1970_01_12.toUnixWeekDays(),7);
    assert.equal(Tue_1970_01_13.toUnixWeekDays(),8);
    assert.equal(Wed_1970_01_14.toUnixWeekDays(),9);
    assert.equal(Thu_1970_01_15.toUnixWeekDays(),10);
    assert.equal(Fri_1970_01_16.toUnixWeekDays(),11);
    assert.equal(Sat_1970_01_17.toUnixWeekDays(),12);
    assert.equal(Sun_1970_01_18.toUnixWeekDays(),12);
    assert.equal(Mon_1970_01_19.toUnixWeekDays(),12);
    assert.equal(Tue_1970_01_20.toUnixWeekDays(),13);
}

function TestGetDifferenceDays(){
    console.log(`\t\t .getDifferenceDays`);
    assert.equal(Fri_2020_01_10.getDifferenceDays(Wed_2020_01_01), 9);
    assert.equal(Wed_2020_01_01.getDifferenceDays(Fri_2020_01_10), -9);
    assert.equal(Wed_2020_01_01.getDifferenceDays(_2019_01_01), 365);
    assert.equal(_2021_01_01.getDifferenceDays(Wed_2020_01_01), 366);
    assert.equal(Thu_1970_01_01.getDifferenceDays(Thu_1970_01_01), 0);
    assert.equal(Thu_1970_01_01.getDifferenceDays(_1969_12_31), 1);
    assert.equal(Thu_1970_01_01.getDifferenceDays(_1969_12_30), 2);
    assert.equal(_1969_12_31.getDifferenceDays(_1969_12_30), 1);
}

function TestGetDifferenceWeekdays(){
    console.log(`\t\t .getDifferenceWeekdays`);
    assert.equal(Thu_1970_01_01.getDifferenceWeekdays(Thu_1970_01_01), 0);
    assert.equal(Fri_1970_01_02.getDifferenceWeekdays(Thu_1970_01_01), 1);
    assert.equal(Sat_1970_01_03.getDifferenceWeekdays(Thu_1970_01_01), 2);
    assert.equal(Sun_1970_01_04.getDifferenceWeekdays(Thu_1970_01_01), 2);
    assert.equal(Mon_1970_01_05.getDifferenceWeekdays(Thu_1970_01_01), 2);
    assert.equal(Tue_1970_01_06.getDifferenceWeekdays(Thu_1970_01_01), 3);
    assert.equal(Wed_1970_01_07.getDifferenceWeekdays(Thu_1970_01_01), 4);
    assert.equal(Thu_1970_01_08.getDifferenceWeekdays(Thu_1970_01_01), 5);
    assert.equal(Fri_1970_01_09.getDifferenceWeekdays(Thu_1970_01_01), 6);
    assert.equal(Sat_1970_01_10.getDifferenceWeekdays(Thu_1970_01_01), 7);
    assert.equal(Sun_1970_01_11.getDifferenceWeekdays(Thu_1970_01_01), 7);
    assert.equal(Mon_1970_01_12.getDifferenceWeekdays(Thu_1970_01_01), 7);
    assert.equal(Tue_1970_01_13.getDifferenceWeekdays(Thu_1970_01_01), 8);
    assert.equal(Wed_1970_01_14.getDifferenceWeekdays(Thu_1970_01_01), 9);
    assert.equal(Thu_1970_01_15.getDifferenceWeekdays(Thu_1970_01_01), 10);
    assert.equal(Fri_1970_01_16.getDifferenceWeekdays(Thu_1970_01_01), 11);
    assert.equal(Sat_1970_01_17.getDifferenceWeekdays(Thu_1970_01_01), 12);
    assert.equal(Sun_1970_01_18.getDifferenceWeekdays(Thu_1970_01_01), 12);
    assert.equal(Mon_1970_01_19.getDifferenceWeekdays(Thu_1970_01_01), 12);

    assert.equal(Tue_1970_01_06.getDifferenceWeekdays(Tue_1970_01_06), 0);
    assert.equal(Wed_1970_01_07.getDifferenceWeekdays(Tue_1970_01_06), 1);
    assert.equal(Thu_1970_01_08.getDifferenceWeekdays(Tue_1970_01_06), 2);
    assert.equal(Fri_1970_01_09.getDifferenceWeekdays(Tue_1970_01_06), 3);
    assert.equal(Sat_1970_01_10.getDifferenceWeekdays(Tue_1970_01_06), 4);
    assert.equal(Sun_1970_01_11.getDifferenceWeekdays(Tue_1970_01_06), 4);
    assert.equal(Mon_1970_01_12.getDifferenceWeekdays(Tue_1970_01_06), 4);
    assert.equal(Tue_1970_01_13.getDifferenceWeekdays(Tue_1970_01_06), 5);

    assert.equal(Wed_2020_01_01.getDifferenceWeekdays(Wed_2020_01_01), 0);
    assert.equal(Thu_2020_01_02.getDifferenceWeekdays(Wed_2020_01_01), 1);
    assert.equal(Fri_2020_01_03.getDifferenceWeekdays(Wed_2020_01_01), 2);
    assert.equal(Sat_2020_01_04.getDifferenceWeekdays(Wed_2020_01_01), 3);
    assert.equal(Sun_2020_01_05.getDifferenceWeekdays(Wed_2020_01_01), 3);
    assert.equal(Mon_2020_01_06.getDifferenceWeekdays(Wed_2020_01_01), 3);
    assert.equal(Tue_2020_01_07.getDifferenceWeekdays(Wed_2020_01_01), 4);
    assert.equal(Wed_2020_01_08.getDifferenceWeekdays(Wed_2020_01_01), 5);
}

function TestGetNetWorkDays(){
    console.log(`\t\t .getNetWorkDays`);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Wed_2020_01_01), 1);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Thu_2020_01_02), 2);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Fri_2020_01_03), 3);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Sat_2020_01_04), 3);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Sun_2020_01_05), 3);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Mon_2020_01_06), 4);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Tue_2020_01_07), 5);
    assert.equal(Wed_2020_01_01.getNetWorkDays(Wed_2020_01_08), 6);
}
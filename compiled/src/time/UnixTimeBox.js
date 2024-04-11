"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnixTimeBox = void 0;
const Expect_1 = require("../away/Expect");
const DayOfMonthNumberBox_1 = require("./DayOfMonthNumberBox");
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenatedDateBox_1 = require("./HyphenatedDateBox");
const MonthNumberBox_1 = require("./MonthNumberBox");
const YearBox_1 = require("./YearBox");
const SecondsBox_1 = require("./SecondsBox");
const Box_1 = require("../away/Box");
/** A number of seconds since Jan 1 1970     */
class UnixTimeBox extends Box_1.Box {
    static MaybeMake(data) {
        if (data === undefined) {
            return undefined;
        }
        return new UnixTimeBox(data);
    }
    static MakeNow() {
        return new UnixTimeBox((0, GetCurrentUnixTime_1.GetCurrentUnixTime)());
    }
    static MakeFromYearMonthDayBoxes(year, monthNumber, dayOfMonthNumber) {
        const monthNumberString = ("0" + monthNumber.getData()).slice(-2);
        const dayOfMonthNumberString = ("0" + dayOfMonthNumber.getData()).slice(-2);
        const isoDate = `${year.getData()}-${monthNumberString}-${dayOfMonthNumberString}`;
        const seconds = Math.floor(new Date(isoDate).getTime() / 1000);
        (0, Expect_1.Expect)(!isNaN(seconds), `Invalid year/month/date.`);
        return new UnixTimeBox(seconds);
    }
    static MakeFromYearMonthDay(year, monthNumber, dayOfMonthNumber) {
        return this.MakeFromYearMonthDayBoxes(new YearBox_1.YearBox(year), new MonthNumberBox_1.MonthNumberBox(monthNumber), new DayOfMonthNumberBox_1.DayOfMonthNumberBox(dayOfMonthNumber));
    }
    toSecondsBox() {
        return new SecondsBox_1.SecondsBox(this.getData());
    }
    toDate() {
        return new Date(1000 * this._data);
    }
    /**
     * returns a nice string in YYYY-MM-DD format, useful for naming files and folders
     * this is also a valid ISO-8601 value
     * */
    toHyphenatedDateString() {
        const date = this.toDate();
        const year = YearBox_1.YearBox.MakeFromDate(date);
        const monthNumber = MonthNumberBox_1.MonthNumberBox.MakeFromDate(date);
        const dayOfMonthNumber = DayOfMonthNumberBox_1.DayOfMonthNumberBox.MakeFromDate(date);
        return (year.toPaddedString(4)
            + `-`
            + monthNumber.toPaddedString(2)
            + `-`
            + dayOfMonthNumber.toPaddedString(2));
    }
    toHyphenatedDateStringBox() {
        const delimitedString = this.toHyphenatedDateString();
        return new HyphenatedDateBox_1.HyphenatedDateBox(delimitedString, () => { });
    }
    /**
     * Returns a string such as "5 days ago", "1 week ago", "30 seconds ago", etc...
     * By default, fromTime will be the current unix time
     * */
    getEnglishAgoString(fromTime) {
        fromTime = fromTime ?? (0, GetCurrentUnixTime_1.GetCurrentUnixTime)();
        const secondsAgo = fromTime - this._data;
        if (secondsAgo < 60) {
            return `${secondsAgo} seconds ago`;
        }
        const minutesAgo = Math.round(secondsAgo / 60);
        if (minutesAgo < 60) {
            return `${minutesAgo} minutes ago`;
        }
        const hoursAgo = Math.round(minutesAgo / 60);
        if (hoursAgo < 24) {
            return `${hoursAgo} hours ago`;
        }
        const fromDataBox = new UnixTimeBox(fromTime).toHyphenatedDateStringBox();
        const thisDataBox = this.toHyphenatedDateStringBox();
        const yearsAgo = fromDataBox.getDifferenceYears(thisDataBox);
        const monthsAgo = fromDataBox.getDifferenceMonths(thisDataBox);
        if (monthsAgo < 1) {
            const daysAgo = Math.round(hoursAgo / 24);
            return `${daysAgo} days ago`;
        }
        if (yearsAgo < 1) {
            return `${monthsAgo} months ago`;
        }
        return `${yearsAgo} years ago`;
    }
    /** Returns undefined if the string is unparsable. */
    static MaybeFromHyphenatedDateString({ hyphenatedDateString, allowEmptyDayOfMonth, allowEmptyMonthNumber, }) {
        let catchingBadData = false;
        try {
            return this.FromHyphenatedDateString({ onBadData: () => catchingBadData = true, hyphenatedDateString, allowEmptyDayOfMonth, allowEmptyMonthNumber });
        }
        catch (e) {
            if (catchingBadData) {
                return undefined;
            }
            throw e;
        }
    }
    /**
     * Throws an error if there is no month/day in the hyphenated string, unless you specifically allow for it.
     */
    static FromHyphenatedDateString({ hyphenatedDateString, allowEmptyDayOfMonth, allowEmptyMonthNumber, onBadData, }) {
        const box = new HyphenatedDateBox_1.HyphenatedDateBox(hyphenatedDateString, onBadData);
        const year = box.getYearBox();
        let month = box.maybeGetMonthNumberBox();
        if (month === undefined && allowEmptyMonthNumber) {
            month = new MonthNumberBox_1.MonthNumberBox(1, () => { });
        }
        (0, Expect_1.Expect)(month !== undefined, "unable to extract month from delimited date string", onBadData);
        let day = box.maybeGetDayOfMonthNumberBox();
        if (day === undefined && allowEmptyDayOfMonth) {
            day = new DayOfMonthNumberBox_1.DayOfMonthNumberBox(1, () => { });
        }
        (0, Expect_1.Expect)(day !== undefined, "unable to extract day of month from delimited date string", onBadData);
        const yyyy = year.toPaddedString(4);
        const mm = month.toPaddedString(2);
        const dd = day.toPaddedString(2);
        const recombined = new HyphenatedDateBox_1.HyphenatedDateBox(`${yyyy}-${mm}-${dd}`, () => { });
        const unixTime = recombined.toUnixTime();
        return new UnixTimeBox(unixTime);
    }
    static FromYyyymmdd(yyyymmdd, onBadData) {
        (0, Expect_1.Expect)(yyyymmdd.length === 8, "argument must be 8 characters long, received: " + yyyymmdd, onBadData);
        const year4 = yyyymmdd.slice(0, 4);
        const monthNumber2 = yyyymmdd.slice(4, 6);
        const dayOfMonth2 = yyyymmdd.slice(6, 8);
        return UnixTimeBox.FromDateStrings(year4, monthNumber2, dayOfMonth2, onBadData);
    }
    static FromDateStrings(year4, monthNumber2, dayOfMonth2, onBadData) {
        (0, Expect_1.Expect)(year4.length === 4, () => `year4 must be 4 characters long, received: ` + year4, onBadData);
        (0, Expect_1.Expect)(monthNumber2.length === 2, () => `monthNumber2 must be 2 characters long, received: ` + monthNumber2, onBadData);
        (0, Expect_1.Expect)(dayOfMonth2.length === 2, () => `dayOfMonth2 must be 2 characters long, received: ` + dayOfMonth2, onBadData);
        const year = YearBox_1.YearBox.FromString(year4, onBadData);
        const monthNumber = MonthNumberBox_1.MonthNumberBox.FromString(monthNumber2, onBadData);
        const dayOfMonthNumber = DayOfMonthNumberBox_1.DayOfMonthNumberBox.FromString(dayOfMonth2, onBadData);
        return this.MakeFromYearMonthDayBoxes(year, monthNumber, dayOfMonthNumber);
    }
    static FromDate(javascriptDate) {
        const unixTime = Math.floor(javascriptDate.getTime() / 1000);
        return new UnixTimeBox(unixTime);
    }
    static FromIso8601DateString(iso8601DateString) {
        return UnixTimeBox.FromDate(new Date(iso8601DateString));
    }
}
exports.UnixTimeBox = UnixTimeBox;

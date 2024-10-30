import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { NumberToOrdinalIndicator } from "../english/NumberToEnglishOrdinalIndicator";
import { PadNumberLeft, StringToInteger } from "../strings/Strings";
import { MaybeGetMonthNumberFromHyphenDate, MaybeGetDayOfMonthNumberFromHyphenDate, GetYearFromHyphenDate } from "./HyphenDate";
import { MonthNumberToEnglishMonthName } from "./MonthNumber";



export function AmericanSlashDateToHyphenDate(slashString: string) {
    ExpectAmericanSlashDate(slashString);
    let [month, day, _year] = slashString.split("/");
    let year = PadNumberLeft(GetYearFromAmericanSlashDate(slashString), 4);
    month = PadNumberLeft(month, 2);
    day = PadNumberLeft(day, 2);
    return `${year}-${month}-${day}`;
}
/** Does the best to get the year from the string. Note that some dates may be ambiguous, for example the '21 could be 2021 or 1921. If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */

export function GetYearFromAmericanSlashDate(slashString: string) {
    ExpectAmericanSlashDate(slashString);
    let [_month, _day, year] = slashString.split("/");
    const yearNumber = StringToInteger(year);
    if (yearNumber < 70) {
        return 2000 + yearNumber;
    }
    if (yearNumber >= 70 && yearNumber <= 99) {
        return 1900 + yearNumber;
    }
    return yearNumber;
}
/** A string in the form "MM/DD/YY" or "MM/DD/YYYY", as (unfortunately) used in American dates around the time of writing (2024). If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */

export function ExpectAmericanSlashDate(slashString: string, onBadData?: OnException) {
    Expect(slashString.split("/").length === 3, `Expected exactly 2 occurences of "/".`, onBadData);
    const [month, day, year] = slashString.split("/");
    Expect(month.length > 0, `Month was empty.`, onBadData);
    Expect(month.length <= 2, `Expected month to have 2 or less characters.`, onBadData);
    Expect(day.length > 0, `Day was empty.`, onBadData);
    Expect(day.length <= 2, `Expected day to have 2 or less characters.`, onBadData);
    Expect(year.length >= 0, `Year was empty.`, onBadData);
}
/** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */

export function HyphenDateToExplicitString(hyphenDate: string) {
    const monthNumber = MaybeGetMonthNumberFromHyphenDate(hyphenDate);
    let result = monthNumber ? MonthNumberToEnglishMonthName(monthNumber) : ``;
    const dayOfMonthNumberBox = MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate);
    if (dayOfMonthNumberBox) {
        Expect(monthNumber, `Cannot make a clear string from this date: ${hyphenDate}`);
        result += ` ` + dayOfMonthNumberBox + NumberToOrdinalIndicator(dayOfMonthNumberBox);
    }
    result += `, ${GetYearFromHyphenDate(hyphenDate)}`;
    return result;
}

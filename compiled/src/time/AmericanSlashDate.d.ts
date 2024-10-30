import { OnException } from "../away/OnException";
export declare function AmericanSlashDateToHyphenDate(slashString: string): string;
/** Does the best to get the year from the string. Note that some dates may be ambiguous, for example the '21 could be 2021 or 1921. If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
export declare function GetYearFromAmericanSlashDate(slashString: string): number;
/** A string in the form "MM/DD/YY" or "MM/DD/YYYY", as (unfortunately) used in American dates around the time of writing (2024). If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
export declare function ExpectAmericanSlashDate(slashString: string, onBadData?: OnException): void;
/** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
export declare function HyphenDateToExplicitString(hyphenDate: string): string;

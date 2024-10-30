import assert from "assert";
import {AmericanSlashDateToHyphenDate} from "./AmericanSlashDate";

export function TestAmericanSlashDate() {
    console.log("\t AmericanSlashDate");
    TestAmericanSlashStringToHyphenDate();
}

function TestAmericanSlashStringToHyphenDate(){
    console.log(`\t\t .AmericanSlashStringToHyphenDate`);
    for(const [input,expected] of [
        ["10/29/24","2024-10-29"]
    ]){
        const hyphenDate = AmericanSlashDateToHyphenDate(input);
        assert.equal(hyphenDate,expected);
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondsBox = void 0;
const Box_1 = require("../away/Box");
class SecondsBox extends Box_1.Box {
    static FromWeeks(weeks) {
        return SecondsBox.FromDays(weeks * 7);
    }
    toWeeks() {
        return this.toDays() / 7;
    }
    toDays() {
        return this.toHours() / 24;
    }
    static FromDays(days) {
        return SecondsBox.FromHours(days * 24);
    }
    toHours() {
        return this.toMinutes() / 60;
    }
    static FromHours(hours) {
        return SecondsBox.FromMinutes(hours * 60);
    }
    toMinutes() {
        return this._data / 60;
    }
    static FromMinutes(minutes) {
        return new SecondsBox(minutes * 60);
    }
    toMilliseconds() {
        return this._data * 1000;
    }
    /** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
    toEnglishApproximateTimeString() {
        const seconds = this._data;
        let unit;
        let value;
        if (seconds < 60) {
            unit = "second";
            value = seconds;
        }
        else if (this.toDays() < 1) {
            unit = "hour";
            value = Math.floor(this.toHours());
        }
        else {
            unit = "day";
            value = Math.floor(this.toDays());
        }
        const isPlural = value > 1;
        if (isPlural) {
            unit += `s`;
        }
        return `${value} ${unit}`;
    }
    static FromMilliseconds(ms) {
        return new SecondsBox(ms / 1000);
    }
}
exports.SecondsBox = SecondsBox;

import Lunar from "./lunar.js";
export default class Solar {
  constructor(year, month, day, hour = 0, minute = 0, second = 0) {
    this._year = year;
    this._month = month;
    this._day = day;
    this._hour = hour;
    this._minute = minute;
    this._second = second;
  }

  getYear() {
    return this._year;
  }

  getMonth() {
    return this._month;
  }

  getDay() {
    return this._day;
  }

  getHour() {
    return this._hour;
  }

  getMinute() {
    return this._minute;
  }

  getSecond() {
    return this._second;
  }

  getLunar() {
    return Lunar.fromSolar(this);
  }

  getJulianDay() {
    let y = this._year;
    let m = this._month;
    let d =
      this._day + ((this._second / 60 + this._minute) / 60 + this._hour) / 24;
    let n = 0;
    let g = false;
    if (y * 372 + m * 31 + Math.floor(d) >= 588829) {
      g = true;
    }
    if (m <= 2) {
      m += 12;
      y--;
    }
    if (g) {
      n = Math.floor(y / 100);
      n = 2 - n + Math.floor(n / 4);
    }
    return (
      Math.floor(365.25 * (y + 4716)) +
      Math.floor(30.6001 * (m + 1)) +
      d +
      n -
      1524.5
    );
  }
}

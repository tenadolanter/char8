import { solar2lunar } from "@tenado/lunarjs";
import Char8 from "./char8.js";
export default class Lunar {
  constructor(year, month, day, hour = 0, minute = 0, second = 0, solar) {
    this._year = year;
    this._month = month;
    this._day = day;
    this._hour = hour;
    this._minute = minute;
    this._second = second;
    this._solar = solar;
    this._char8 = new Char8(this);
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

  getYearGan(){
    return this._char8.yearGan;
  }

  getYearZhi(){
    return this._char8.yearZhi;
  }

  getMonthGan(){
    return this._char8.monthGan;
  }

  getMonthZhi(){
    return this._char8.monthZhi;
  }

  getDayGan(){
    return this._char8.dayGan;
  }

  getDayZhi(){
    return this._char8.dayZhi;
  }

  getTimeGan(){
    return this._char8.timeGan;
  }

  getTimeZhi(){
    return this._char8.timeZhi;
  }

  static fromSolar(solar){
    const lunar = solar2lunar(solar.getYear(), solar.getMonth(), solar.getDay());
    return new Lunar(lunar.lYear, lunar.lMonth, lunar.lDay, solar.getHour(), solar.getMinute(), solar.getSecond(), solar);
  }
}

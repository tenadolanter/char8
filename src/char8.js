import { GAN, ZHI } from "./config.js";
import { getTimeZhiIndex } from "./utils.js";
import Solar from "./solar.js";
export default class Char8 {
  constructor(lunar) {
    const info = Char8._compute(lunar);
    this.yearGan = info.yearGan;
    this.yearZhi = info.yearZhi;
    this.monthGan = info.monthGan;
    this.monthZhi = info.monthZhi;
    this.dayGan = info.dayGan;
    this.dayZhi = info.dayZhi;
    this.timeGan = info.timeGan;
    this.timeZhi = info.timeZhi;
  }

  static _compute(lunar) {
    const info = {
      yearGan: "",
      yearZhi: "",
      monthGan: "",
      monthZhi: "",
      dayGan: "",
      dayZhi: "",
      timeGan: "",
      timeZhi: "",
    };
    Char8._computeYear(info, lunar);
    Char8._computeMonth(info, lunar);
    Char8._computeDay(info, lunar);
    Char8._computeTime(info, lunar);
    return info;
  }

  static _computeYear(info, lunar) {
    const year = lunar.getYear();
    const offset = year - 4;
    let yearGanIndex = offset % 10;
    let yearZhiIndex = offset % 12;
    if (yearGanIndex < 0) {
      yearGanIndex += 10;
    }
    if (yearZhiIndex < 0) {
      yearZhiIndex += 12;
    }
    info.yearGan = GAN?.[yearGanIndex];
    info.yearZhi = ZHI?.[yearZhiIndex];
    info.yearGanIndex = yearGanIndex;
    info.yearZhiIndex = yearZhiIndex;
  }

  static _computeMonth(info, lunar) {
    const month = lunar.getMonth() - 1;
    const yearGanIndex = info.yearGanIndex + 1;
    const monthGanIndex = (yearGanIndex * 2 + month) % 10;
    const monthZhiIndex = (month + 2) % 12;
    info.monthGan = GAN?.[monthGanIndex];
    info.monthZhi = ZHI?.[monthZhiIndex];
    info.monthGanIndex = monthGanIndex;
    info.monthZhiIndex = monthZhiIndex;
  }

  static _computeDay(info, lunar) {
    const solar = lunar._solar;
    const noon = new Solar(
      solar.getYear(),
      solar.getMonth(),
      solar.getDay(),
      12,
      0,
      0
    );
    const offset = Math.floor(noon.getJulianDay()) - 11;
    const dayGanIndex = offset % 10;
    const dayZhiIndex = offset % 12;
    info.dayGan = GAN?.[dayGanIndex];
    info.dayZhi = ZHI?.[dayZhiIndex];
    info.dayGanIndex = dayGanIndex;
    info.dayZhiIndex = dayZhiIndex;
    let dayGanExact = dayGanIndex;
    const hour = lunar._hour;
    const minute = lunar._minute;
    const hm =
      (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute;
    if (hm >= "23:00" && hm <= "23:59") {
      dayGanExact++;
      if (dayGanExact >= 10) {
        dayGanExact -= 10;
      }
      dayZhiExact++;
      if (dayZhiExact >= 12) {
        dayZhiExact -= 12;
      }
    }
    info.dayGanIndexExact = dayGanExact;
  }

  static _computeTime(info, lunar) {
    const hour = lunar._hour;
    const minute = lunar._minute;
    const hourAndMinuteStr =
      (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute;
    const timeZhiIndex = getTimeZhiIndex(hourAndMinuteStr);
    const timeGanIndex = ((info.dayGanIndexExact % 5) * 2 + timeZhiIndex) % 10;
    info.timeGan = GAN?.[timeGanIndex];
    info.timeZhi = ZHI?.[timeZhiIndex];
  }
}

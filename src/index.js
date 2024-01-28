import Solar from "./solar.js";

export default (year, month, day, hour = 0, minute = 0, second = 0) => {
  const solar = new Solar(year, month, day, hour, minute, second);
  const result = solar.getLunar();
  console.log(result._char8);
  return result._char8;
}
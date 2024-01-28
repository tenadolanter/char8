export const getTimeZhiIndex = (hm) => {
  if (!hm) {
    return 0;
  }
  if (hm.length > 5) {
    hm = hm.substring(0, 5);
  }
  let x = 1;
  for (let i = 1; i < 22; i += 2) {
    if (
      hm >= (i < 10 ? "0" : "") + i + ":00" &&
      hm <= (i + 1 < 10 ? "0" : "") + (i + 1) + ":59"
    ) {
      return x;
    }
    x++;
  }
  return 0;
};

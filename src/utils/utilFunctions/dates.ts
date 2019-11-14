/**
 * Gets the difference between 2 dates, and returns that difference as a count of minutes
 * @param {Date} dateOne The first date
 * @param {Date} dateTwo The second date
 * @return {BigInteger} The difference in minutes
 */
export const getDateDifferenceInMinutes = (dateOne: Date, dateTwo: Date): number => {
  if (!dateOne || !dateTwo) {
    return null;
  }

  let first = dateOne;
  let second = dateTwo;

  if (Object.prototype.toString.call(first) !== '[object Date]') {
    try {
      first = new Date(first);
    } catch (err) {
      return null;
    }
  }

  if (Object.prototype.toString.call(second) !== '[object Date]') {
    try {
      second = new Date(second);
    } catch (err) {
      return null;
    }
  }

  const milliseconds = Math.abs(<any>first - <any>second);
  const minutes = Math.floor(milliseconds / 1000 / 60);
  return minutes;
};

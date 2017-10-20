/**
 * Utility class for dates with schedule things
 * Does not deal with time zones
 */
export default class ScheduleManager {
  /**
   * Returns the time as a string along with AM or PM suffixed
   * @param {string} dateString
   * @returns {string} - A string representing date ie '9:00 AM'
   */
  static getNonMilitaryStartTime(dateString) {
    const militaryHour = date.getHours();
    const meridiem = (militaryHour >= 12) ? 'AM' : 'PM';
    return `${militaryHour % 12}:${date.getMinutes()} ${meridiem}`;
  }

  /**
   * Returns 1 if the first dateString is later, -1 if not. Useful for sorting
   * functions
   * @param {string} dateStringA
   * @param {string} dateStringB
   * @returns {number}
   */
  static dateStringsComparator(dateStringA, dateStringB) {
    return (new Date(dateStringA) > new Date(dateStringB)) ? 1 : -1;
  }

  /**
   * Returns true if the first dateString is later
   * @param {string} dateStringA
   * @param {string} dateStringB
   * @returns {bool}
   */
  static isLater(dateStringA, dateStringB) {
    return new Date(dateStringA) > new Date(dateStringB);
  }

  static getHourFromMs(ms) {
    return ms / 1000 / 60 / 60;
  }
}

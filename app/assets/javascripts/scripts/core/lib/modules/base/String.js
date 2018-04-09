module.exports = class LibString {
  constructor() {
  }

  /**
   * String from CamelCase to dash separator
   * @property LibString.toDash
   * @param {string] str
   * @returns {string}
   */
  toDash(str) {
    return str.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase()).replace(/^-/, '');
  }
};
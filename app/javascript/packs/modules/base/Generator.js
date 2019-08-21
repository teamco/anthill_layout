/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Define generators
 * @class LibGenerator
 * @constructor
 */
export class LibGenerator {

  constructor() {
  }

  /**
   * Generate UUID
   * @description RFC4122 Description "http://www.ietf.org/rfc/rfc4122.txt"
   * @memberOf LibGenerator
   * @param {string} [uuid]
   * @static
   * @returns {string}
   */
  static UUID(uuid) {

    if (uuid) {
      return uuid;
    }

    let s = [], i;
    const hexDigits = '0123456789abcdef';
    for (i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = '4';
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
  }

  /**
   * Generate random color HEX
   * @memberOf LibGenerator
   * @static
   * @returns {string}
   */
  static randomColor() {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }

  /**
   * Invert CSS color [color|background-color]
   * @memberOf LibGenerator
   * @param {string} cssType
   */
  invertColor(cssType) {
    // Create RGBColor object
    const color = new RGBColor(this.$.css(cssType));
    if (color.ok) {
      // Subtract each color component from 255
      return [
        'rgb(', (255 - color.r), ', ',
        (255 - color.g), ', ',
        (255 - color.b), ')'
      ].join('');
    }
  }
}
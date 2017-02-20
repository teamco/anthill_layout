/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(function defineLibString() {

  /**
   * Define LibString
   * @class LibString
   * @constructor
   */
  var LibString = function LibString() {
  };

  LibString.extend('LibString', {

    /**
     * Define md5
     * @memberOf LibString
     * @param f
     * @returns {*}
     */
    md5: function md5(f) {

      function md5cycle(f, h) {
        var i = f[0]
            , n = f[1]
            , r = f[2]
            , g = f[3];
        i = ff(i, n, r, g, h[0], 7, -680876936),
            g = ff(g, i, n, r, h[1], 12, -389564586),
            r = ff(r, g, i, n, h[2], 17, 606105819),
            n = ff(n, r, g, i, h[3], 22, -1044525330),
            i = ff(i, n, r, g, h[4], 7, -176418897),
            g = ff(g, i, n, r, h[5], 12, 1200080426),
            r = ff(r, g, i, n, h[6], 17, -1473231341),
            n = ff(n, r, g, i, h[7], 22, -45705983),
            i = ff(i, n, r, g, h[8], 7, 1770035416),
            g = ff(g, i, n, r, h[9], 12, -1958414417),
            r = ff(r, g, i, n, h[10], 17, -42063),
            n = ff(n, r, g, i, h[11], 22, -1990404162),
            i = ff(i, n, r, g, h[12], 7, 1804603682),
            g = ff(g, i, n, r, h[13], 12, -40341101),
            r = ff(r, g, i, n, h[14], 17, -1502002290),
            n = ff(n, r, g, i, h[15], 22, 1236535329),
            i = gg(i, n, r, g, h[1], 5, -165796510),
            g = gg(g, i, n, r, h[6], 9, -1069501632),
            r = gg(r, g, i, n, h[11], 14, 643717713),
            n = gg(n, r, g, i, h[0], 20, -373897302),
            i = gg(i, n, r, g, h[5], 5, -701558691),
            g = gg(g, i, n, r, h[10], 9, 38016083),
            r = gg(r, g, i, n, h[15], 14, -660478335),
            n = gg(n, r, g, i, h[4], 20, -405537848),
            i = gg(i, n, r, g, h[9], 5, 568446438),
            g = gg(g, i, n, r, h[14], 9, -1019803690),
            r = gg(r, g, i, n, h[3], 14, -187363961),
            n = gg(n, r, g, i, h[8], 20, 1163531501),
            i = gg(i, n, r, g, h[13], 5, -1444681467),
            g = gg(g, i, n, r, h[2], 9, -51403784),
            r = gg(r, g, i, n, h[7], 14, 1735328473),
            n = gg(n, r, g, i, h[12], 20, -1926607734),
            i = hh(i, n, r, g, h[5], 4, -378558),
            g = hh(g, i, n, r, h[8], 11, -2022574463),
            r = hh(r, g, i, n, h[11], 16, 1839030562),
            n = hh(n, r, g, i, h[14], 23, -35309556),
            i = hh(i, n, r, g, h[1], 4, -1530992060),
            g = hh(g, i, n, r, h[4], 11, 1272893353),
            r = hh(r, g, i, n, h[7], 16, -155497632),
            n = hh(n, r, g, i, h[10], 23, -1094730640),
            i = hh(i, n, r, g, h[13], 4, 681279174),
            g = hh(g, i, n, r, h[0], 11, -358537222),
            r = hh(r, g, i, n, h[3], 16, -722521979),
            n = hh(n, r, g, i, h[6], 23, 76029189),
            i = hh(i, n, r, g, h[9], 4, -640364487),
            g = hh(g, i, n, r, h[12], 11, -421815835),
            r = hh(r, g, i, n, h[15], 16, 530742520),
            n = hh(n, r, g, i, h[2], 23, -995338651),
            i = ii(i, n, r, g, h[0], 6, -198630844),
            g = ii(g, i, n, r, h[7], 10, 1126891415),
            r = ii(r, g, i, n, h[14], 15, -1416354905),
            n = ii(n, r, g, i, h[5], 21, -57434055),
            i = ii(i, n, r, g, h[12], 6, 1700485571),
            g = ii(g, i, n, r, h[3], 10, -1894986606),
            r = ii(r, g, i, n, h[10], 15, -1051523),
            n = ii(n, r, g, i, h[1], 21, -2054922799),
            i = ii(i, n, r, g, h[8], 6, 1873313359),
            g = ii(g, i, n, r, h[15], 10, -30611744),
            r = ii(r, g, i, n, h[6], 15, -1560198380),
            n = ii(n, r, g, i, h[13], 21, 1309151649),
            i = ii(i, n, r, g, h[4], 6, -145523070),
            g = ii(g, i, n, r, h[11], 10, -1120210379),
            r = ii(r, g, i, n, h[2], 15, 718787259),
            n = ii(n, r, g, i, h[9], 21, -343485551),
            f[0] = add32(i, f[0]),
            f[1] = add32(n, f[1]),
            f[2] = add32(r, f[2]),
            f[3] = add32(g, f[3])
      }

      function cmn(f, h, i, n, r, g) {
        return h = add32(add32(h, f), add32(n, g)),
            add32(h << r | h >>> 32 - r, i)
      }

      function ff(f, h, i, n, r, g, t) {
        return cmn(h & i | ~h & n, f, h, r, g, t)
      }

      function gg(f, h, i, n, r, g, t) {
        return cmn(h & n | i & ~n, f, h, r, g, t)
      }

      function hh(f, h, i, n, r, g, t) {
        return cmn(h ^ i ^ n, f, h, r, g, t)
      }

      function ii(f, h, i, n, r, g, t) {
        return cmn(i ^ (h | ~n), f, h, r, g, t)
      }

      function md51(f) {
        txt = "";
        var h, i = f.length, n = [1732584193, -271733879, -1732584194,
          271733878];
        for (h = 64; h <= f.length; h += 64) {
          md5cycle(n, md5blk(f.substring(h - 64, h)));
        }
        f = f.substring(h - 64);
        var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (h = 0; h < f.length; h++) {
          r[h >> 2] |= f.charCodeAt(h) << (h % 4 << 3);
        }
        if (r[h >> 2] |= 128 << (h % 4 << 3),
            h > 55) {
          for (md5cycle(n, r),
              h = 0; 16 > h; h++) {
            r[h] = 0;
          }
        }
        return r[14] = 8 * i,
            md5cycle(n, r),
            n
      }

      function md5blk(f) {
        var h, i = [];
        for (h = 0; 64 > h; h += 4) {
          i[h >> 2] = f.charCodeAt(h) + (f.charCodeAt(h + 1) << 8) +
              (f.charCodeAt(h + 2) << 16) + (f.charCodeAt(h + 3) << 24);
        }
        return i
      }

      function rhex(f) {
        for (var h = "", i = 0; 4 > i; i++) {
          h += hex_chr[f >> 8 * i + 4 & 15] + hex_chr[f >> 8 * i & 15];
        }
        return h
      }

      function hex(f) {
        for (var h = 0; h < f.length; h++) {
          f[h] = rhex(f[h]);
        }
        return f.join("")
      }

      function add32(f, h) {
        var i = (65535 & f) + (65535 & h)
            , n = (f >> 16) + (h >> 16) + (i >> 16);
        return n << 16 | 65535 & i
      }

      var hex_chr = "0123456789abcdef".split("");

      return hex(md51(f));
    },

    /**
     * UTF8 to Base64
     * @memberOf LibString
     * @param {string} str
     * @returns {string}
     */
    utf8ToBase64: function utf8ToBase64(str) {
      return window.btoa(
          encodeURIComponent(str)
      );
    },

    /**
     * Base64 to UTF8
     * @memberOf LibString
     * @param {string} str
     * @returns {string}
     */
    base64ToUtf8: function base64ToUtf8(str) {
      return decodeURIComponent(
          window.atob(str)
      );
    },

    /**
     * Convert string to base64
     * @memberOf LibString
     * @memberOf String
     */
    base64: (function _base64() {

      "use strict";

      var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      /**
       * _utf8_encode
       * @param string
       * @returns {string}
       * @private
       */
      var _utf8_encode = function (string) {

        var utftext = "", c, n;

        string = string.replace(/\r\n/g, "\n");

        for (n = 0; n < string.length; n++) {

          c = string.charCodeAt(n);

          if (c < 128) {

            utftext += String.fromCharCode(c);

          } else if ((c > 127) && (c < 2048)) {

            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);

          } else {

            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }

        return utftext;
      };

      /**
       * _utf8_decode
       * @param utftext
       * @returns {string}
       * @private
       */
      var _utf8_decode = function _utf8_decode(utftext) {
        var string = "", i = 0, c = 0, c1 = 0, c2 = 0;

        while (i < utftext.length) {

          c = utftext.charCodeAt(i);

          if (c < 128) {

            string += String.fromCharCode(c);
            i++;

          } else if ((c > 191) && (c < 224)) {

            c1 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
            i += 2;

          } else {

            c1 = utftext.charCodeAt(i + 1);
            c2 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(
                ((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
            i += 3;
          }
        }

        return string;
      };

      /**
       * _hexEncode
       * @param input
       * @returns {string}
       * @private
       */
      var _hexEncode = function _hexEncode(input) {
        var output = '', i;

        for (i = 0; i < input.length; i++) {
          output += input.charCodeAt(i).toString(16);
        }

        return output;
      };

      /**
       * _hexDecode
       * @param input
       * @returns {string}
       * @private
       */
      var _hexDecode = function _hexDecode(input) {
        var output = '', i;

        if (input.length % 2 > 0) {
          input = '0' + input;
        }

        for (i = 0; i < input.length; i = i + 2) {
          output += String.fromCharCode(
              parseInt(input.charAt(i) + input.charAt(i + 1), 16));
        }

        return output;
      };

      /**
       * encode
       * @param input
       * @returns {string}
       */
      var encode = function encode(input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

        input = _utf8_encode(input);

        while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output += _keyStr.charAt(enc1);
          output += _keyStr.charAt(enc2);
          output += _keyStr.charAt(enc3);
          output += _keyStr.charAt(enc4);

        }

        return output;
      };

      /**
       * decode
       * @param input
       * @returns {string}
       */
      var decode = function decode(input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output += String.fromCharCode(chr1);

          if (enc3 !== 64) {
            output += String.fromCharCode(chr2);
          }
          if (enc4 !== 64) {
            output += String.fromCharCode(chr3);
          }

        }

        return _utf8_decode(output);
      };

      /**
       * decodeToHex
       * @param input
       * @returns {string}
       */
      var decodeToHex = function decodeToHex(input) {
        return _hexEncode(decode(input));
      };

      /**
       * encodeFromHex
       * @param input
       * @returns {string}
       */
      var encodeFromHex = function encodeFromHex(input) {
        return encode(_hexDecode(input));
      };

      return {
        'encode': encode,
        'decode': decode,
        'decodeToHex': decodeToHex,
        'encodeFromHex': encodeFromHex
      };
    }())
  });

  return new LibString();
});

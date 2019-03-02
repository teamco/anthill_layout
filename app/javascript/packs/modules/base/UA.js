/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 6:35 PM
 * To change this template use File | Settings | File Templates.
 */

export class LibUserAgent {
  /**
   * Define LibUserAgent
   * @constructor
   * @class LibUserAgent
   */
  constructor() {

    /**
     * Define browser info
     * @memberOf LibUserAgent
     */
    this.browser = (function() {
      const ua = navigator.userAgent;
      let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      let tem;
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return ['IE', (tem[1] || '')];
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) return ['Opera', tem[1]];
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M;
    })();
  }

  /**
   * Get browser version
   * @param {RegExp} regexp
   * @memberOf LibUserAgent
   * @returns {*}
   * @private
   */
  _getBrowserInfo(regexp) {
    if (this.browser[0].match(regexp)) {
      return this.browser[1];
    }
  }

  /**
   * Check isLocalhost.
   * @memberOf LibUserAgent
   * @returns {boolean}
   */
  isLocalHost() {
    return !!window.location.hostname.match(/localhost/);
  }

  /**
   * Get Opera
   * @memberOf LibUserAgent
   * @returns {*}
   */
  opera() {
    this._getBrowserInfo(/opera/i);
  }

  /**
   * Get Chrome
   * @memberOf LibUserAgent
   * @returns {*}
   */
  chrome() {
    this._getBrowserInfo(/chrome/i);
  }

  /**
   * Get Safari
   * @memberOf LibUserAgent
   * @returns {*}
   */
  safari() {
    this._getBrowserInfo(/safari/i);
  }

  /**
   * Get Firefox
   * @memberOf LibUserAgent
   * @returns {*}
   */
  firefox() {
    this._getBrowserInfo(/firefox/i);
  }

  /**
   * Get MS Internet explorer
   * @memberOf LibUserAgent
   * @returns {*}
   */
  msie() {
    this._getBrowserInfo(/ie/i);
  }

  /**
   * Get browser zoom
   * @memberOf LibUserAgent
   * @returns {number}
   */
  getBrowserZoom() {
    let zoom = 1;

    // Get Chrome/Safari zoome
    if (this.chrome() || this.safari()) {
      zoom = 1 / (screen.width / $(window).width());
    }

    // Get Firefox zoom
    if (this.firefox() && !isNaN(window.devicePixelRatio)) {
      zoom = 1 / (window.devicePixelRatio);
    }

    // Get IE zoom
    if (this.msie() && !isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
      zoom = 1 / (Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100);
    }

    return zoom;
  }

  /**
   * Define full screen
   * @memberOf LibUserAgent
   * @param fullScreen
   * @param el
   */
  fullScreen(el, fullScreen = true) {

    // Define mode
    const mode = fullScreen ? 'Request' : 'Cancel';
    const modeMs = fullScreen ? 'Request' : 'exit';

    // Supports most browsers and their versions.
    const requestMethod =
        el[`${mode.toLowerCase()}FullScreen`] ||
        el[`webkit${mode}FullScreen`] ||
        el[`moz${mode}FullScreen`] ||
        el[`${modeMs}Fullscreen`];

    if (requestMethod) {

      // cancel full screen.
      requestMethod.call(el);

    } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.

      /**
       * @type {ActiveXObject}
       */
      const wscript = new ActiveXObject('WScript.Shell');
      if (wscript) wscript.SendKeys('{F11}');
    }
  }
}
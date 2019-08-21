/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 6:35 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @export LibUserAgent
 */
export class LibUserAgent {

  /**
   * Check isLocalhost.
   * @memberOf LibUserAgent
   * @static
   * @returns {boolean}
   */
  static isLocalHost() {
    return !!window.location.hostname.match(/localhost/);
  }

  /**
   * Get browser zoom
   * @memberOf LibUserAgent
   * @static
   * @returns {number}
   */
  static getBrowserZoom() {
    let zoom = 1;

    // Get Firefox zoom
    if (window.devicePixelRatio) {
      zoom = 1 / (window.devicePixelRatio);
    } else {
      // Get Chrome/Safari zoom
      zoom = 1 / (screen.width / $(window).width());
    }

    // Get IE zoom
    if (screen['logicalXDPI']) {
      zoom = 1 / (Math.round((screen['deviceXDPI'] / screen['logicalXDPI']) * 100) / 100);
    }

    return zoom;
  }

  /**
   * Define full screen
   * @memberOf LibUserAgent
   * @param fullScreen
   * @param el
   * @static
   */
  static fullScreen(el, fullScreen = true) {

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
      if (wscript) wscript['SendKeys']('{F11}');
    }
  }
}
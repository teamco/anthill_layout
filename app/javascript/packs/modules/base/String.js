/**
 * @class LibString
 * @type {LibString}
 */
export class LibString {

  /**
   * @constructor
   */
  constructor() {

    String.prototype.repeat = undefined;
    String.prototype.toInstanceName = undefined;
    String.prototype.capitalize = undefined;
    String.prototype.utf82base64 = undefined;
    String.prototype.base642utf8 = undefined;
    String.prototype.toHtml = undefined;
    String.prototype.humanize = undefined;
    String.prototype.toClassName = undefined;
    String.prototype.toDash = undefined;
    String.prototype.toResource = undefined;
    String.prototype.toCamelCase = undefined;
    String.prototype.toPoint = undefined;
    String.prototype.toUnderscore = undefined;

    this.extendString();
  }

  /**
   * @method createShim
   * @property LibString
   * @param {string} method
   * @param {function} fn
   */
  static createShim(method, fn) {

    if (!String.prototype[method]) {

      /**
       * @memberOf String
       * @returns {string}
       */
      String.prototype[method] = fn;
    }
  }

  /**
   * @method extendString
   * @property LibString
   */
  extendString() {

    // Duplicate string
    LibString.createShim('repeat', function(times) {
      return (new Array((times || 0) + 1)).join(this);
    });

    // Convert to js instance style name.
    LibString.createShim('toInstanceName', function() {
      return this.charAt(0).toLowerCase() + this.slice(1);
    });

    // Convert to capitalize.
    LibString.createShim('capitalize', function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    });

    // Convert utf8 to base64.
    LibString.createShim('utf82base64', function() {
      return window.btoa(encodeURIComponent(encodeURI(this)));
    });

    // Convert base64 to utf8.
    LibString.createShim('base642utf8', function() {
      return decodeURI(decodeURIComponent(window.atob(this)));
    });

    // Convert string to DOM element.
    LibString.createShim('toHtml', function() {
      const template = document.createElement('template');
      template.innerHTML = this;
      return template.content.firstChild;
    });

    // Convert string to humanized string.
    LibString.createShim('humanize', function() {
      return this.toString().
          replace(/([a-z\d])([A-Z]+)/g, '$1_$2').
          replace(/[-\s]+/g, '_').toLowerCase().
          replace(/[\W_]+/g, ' ').
          capitalize();
    });

    // Convert string to css class style.
    LibString.createShim('toClassName', function() {
      return this.toLowerCase().
          replace(/[^\w\s]|_/g, ' ').
          replace(/ +(?= )/g, '').
          replace(/ /g, '-');
    });

    // Convert camel cased string to dash separator.
    LibString.createShim('toDash', function() {
      return this.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase()).replace(/^-/, '');
    });

    // Convert camel cased string to resource.
    LibString.createShim('toResource', function() {
      return this.toLowerCase().replace(/[\W_]+/g, '.');
    });

    // Convert string to camel case.
    LibString.createShim('toCamelCase', function() {
      return this.replace(/\s(.)/g, $1 => $1.toUpperCase()).
          replace(/\s/g, '').
          replace(/^(.)/, $1 => $1.toLowerCase()).
          replace(/(\.[a-z])/g, $1 => $1.toUpperCase().replace(/\./, '')).
          replace(/( [a-z])/g, $1 => $1.toUpperCase().replace(/ /, '')).
          replace(/(-[a-z])/g, $1 => $1.toUpperCase().replace(/-/, ''));
    });

    // Convert camel cased string to underscore separator.
    LibString.createShim('toPoint', function() {
      return this.replace(/([A-Z])/g, $1 => '.' + $1.toLowerCase());
    });

    // Convert camel cased string to point separator.
    LibString.createShim('toUnderscore', function() {
      return this.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase());
    });
  }
}
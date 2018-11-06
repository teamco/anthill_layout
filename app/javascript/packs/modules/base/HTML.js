/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

defineP(function defineLibHTML() {

  /**
   * Define LibHTML
   * @class LibHTML
   * @constructor
   */
  var LibHTML = function LibHTML() {
  };

  LibHTML.extend('LibHTML', {

    /**
     * Escape HTML
     * @memberOf LibHTML
     * @param text
     * @param escape
     * @returns {*}
     */
    escapeHTML: function escapeHTML(text, escape) {
      var div = $('<div/>');
      if (typeof(text) === 'string') {
        return escape ?
            // Escape the text with HTML encoding chars
            div.text(text).html() :
            // Unescape the text from HTML encoding chars
            div.html(text).text();
      } else {
        return typeof text;
      }
    },

    /**
     * Escape HTML Symbols
     * @memberOf LibHTML
     * @param text
     * @param source
     * @param target
     * @returns {XML|string|void}
     */
    escapeHTMLSymbols: function escapeHTMLSymbols(text, source, target) {
      return this.escapeHTML(text, 1).replace(
          (new RegExp(source, 'gi')),
          target
      );
    }
  });

  return new LibHTML();
});
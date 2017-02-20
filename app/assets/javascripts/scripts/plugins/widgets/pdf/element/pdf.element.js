/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function definePdfElement(PluginElement) {

  /**
   * Define Pdf Element
   * @param view
   * @param opts
   * @returns {PdfElement}
   * @constructor
   * @class PdfElement
   * @extends PluginElement
   */
  var PdfElement = function PdfElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('pdf', {resource: '/widgets'});

    return this;
  };

  return PdfElement.extend('PdfElement', {

    /**
     * Render Embedded content
     * @memberOf PdfElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {

      if (typeof (url) !== 'string' || (url && !(url + '').match(/\.pdf/))) {
        this.view.scope.logger.warn('File does not match to PDF');
        return false;
      }

      var $iframe = $('<iframe />').attr({
        src: 'http://docs.google.com/gview?url=' + url + '&embedded=true',
        frameborder: 0
      });

      this.$.append($iframe);
    }

  }, PluginElement.prototype);

});
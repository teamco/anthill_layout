/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineKalturaElement(PluginElement) {

  /**
   * Define Kaltura Element
   * @param view
   * @param opts
   * @returns {KalturaElement}
   * @constructor
   * @class KalturaElement
   * @extends PluginElement
   */
  var KalturaElement = function KalturaElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('kaltura', {resource: '/widgets'});

    return this;
  };

  return KalturaElement.extend('KalturaElement', {

    /**
     * Render Embedded content
     * @memberOf KalturaElement
     * @type {string}
     */
    renderEmbeddedContent: function renderEmbeddedContent(iframe) {
      this.$.append(
          this.renderIframe(
              $(iframe).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});

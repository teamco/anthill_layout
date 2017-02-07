/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineReleasewireElement(PluginElement) {

  /**
   * Define Releasewire Element
   * @param view
   * @param opts
   * @returns {ReleasewireElement}
   * @constructor
   * @class ReleasewireElement
   * @extends PluginElement
   */
  var ReleasewireElement = function ReleasewireElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('releasewire', {resource: '/widgets'});

    return this;
  };

  return ReleasewireElement.extend('ReleasewireElement', {

    /**
     * Render Embedded content
     * @memberOf ReleasewireElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(embed);
    }

  }, PluginElement.prototype);
});

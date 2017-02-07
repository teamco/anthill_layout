/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineFirePicElement(PluginElement) {

  /**
   * Define FirePic Element
   * @param view
   * @param opts
   * @returns {FirePicElement}
   * @constructor
   * @class FirePicElement
   * @extends PluginElement
   */
  var FirePicElement = function FirePicElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('fire.pic', {resource: '/widgets'});

    return this;
  };

  return FirePicElement.extend('FirePicElement', {

    /**
     * Render Embedded content
     * @memberOf FirePicElement
     * @param {string} url
     */
    renderEmbeddedContent: function renderEmbeddedContent(url) {
      this.$.append(
          $('<img />').attr({
            src: url
          })
      );
    }

  }, PluginElement.prototype);

});

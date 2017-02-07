/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineIceFloeElement(PluginElement) {

  /**
   * Define IceFloe Element
   * @param view
   * @param opts
   * @returns {IceFloeElement}
   * @constructor
   * @class IceFloeElement
   * @extends PluginElement
   */
  var IceFloeElement = function IceFloeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('ice.floe', {
      resource: '/widgets'
    });

    return this;
  };

  return IceFloeElement.extend('IceFloeElement', {

    /**
     * Render Embedded content
     * @memberOf IceFloeElement
     */
    renderEmbeddedContent: function renderEmbeddedContent() {
      var $element = this;
      var $iceFloe = '<div class="floe_base"></div>';
      $element.view.controller.clearParentThumbnail();
      $element.$.append(
          $iceFloe
      );
    }

  }, PluginElement.prototype);

});
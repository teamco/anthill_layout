/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineMobypictureElement(PluginElement) {

  /**
   * Define Mobypicture Element
   * @param view
   * @param opts
   * @returns {MobypictureElement}
   * @constructor
   * @class MobypictureElement
   * @extends PluginElement
   */
  var MobypictureElement = function MobypictureElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('mobypicture', {resource: '/widgets'});

    return this;
  };

  return MobypictureElement.extend('MobypictureElement', {

    /**
     * Render Embedded content
     * @memberOf MobypictureElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(embed);
    }

  }, PluginElement.prototype);

});

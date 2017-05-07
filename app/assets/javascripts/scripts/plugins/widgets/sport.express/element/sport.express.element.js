/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineSportExpressElement(PluginElement) {

  /**
   * Define SportExpress Element
   * @param view
   * @param opts
   * @returns {SportExpressElement}
   * @constructor
   * @class SportExpressElement
   * @extends PluginElement
   */
  var SportExpressElement = function SportExpressElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('sport.express', {resource: '/widgets'});

    return this;
  };

  return SportExpressElement.extend('SportExpressElement', {

    /**
     * Render Embedded content
     * @memberOf SportExpressElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(
          this.renderObject(embed)
      );
    }

  }, PluginElement.prototype);

});

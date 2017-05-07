/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTwentyThreeElement(PluginElement) {

  /**
   * Define TwentyThree Element
   * @param view
   * @param opts
   * @returns {TwentyThreeElement}
   * @constructor
   * @class TwentyThreeElement
   * @extends PluginElement
   */
  var TwentyThreeElement = function TwentyThreeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('twenty.three', {resource: '/widgets'});

    return this;
  };

  return TwentyThreeElement.extend('TwentyThreeElement', {

    /**
     * Render Embedded content
     * @memberOf TwentyThreeElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.$.append(embed);
    }

  }, PluginElement.prototype);

});

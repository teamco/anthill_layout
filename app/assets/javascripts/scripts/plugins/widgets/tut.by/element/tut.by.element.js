/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTutByElement(PluginElement) {

  /**
   * Define TutBy Element
   * @param view
   * @param opts
   * @returns {TutByElement}
   * @constructor
   * @class TutByElement
   * @extends PluginElement
   */
  var TutByElement = function TutByElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('tut.by', {resource: '/widgets'});

    return this;
  };

  return TutByElement.extend('TutByElement', {

    /**
     * Render Embedded content
     * @memberOf TutByElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(
          this.renderObject(
              embed.toHtml()
          )
      );
    }

  }, PluginElement.prototype);
});

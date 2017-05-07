/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineInfogrAmElement(PluginElement) {

  /**
   * Define InfogrAm Element
   * @param view
   * @param opts
   * @returns {InfogrAmElement}
   * @constructor
   * @class InfogrAmElement
   * @extends PluginElement
   */
  var InfogrAmElement = function InfogrAmElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('infogr.am', {resource: '/widgets'});

    return this;
  };

  return InfogrAmElement.extend('InfogrAmElement', {

    /**
     * Render Embedded content
     * @memberOf InfogrAmElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(embed);
    }

  }, PluginElement.prototype);
});

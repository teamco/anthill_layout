/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineLearningAppsElement(PluginElement) {

  /**
   * Define LearningApps Element
   * @param view
   * @param opts
   * @returns {LearningAppsElement}
   * @constructor
   * @class LearningAppsElement
   * @extends PluginElement
   */
  var LearningAppsElement = function LearningAppsElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('learning.apps', {resource: '/widgets'});

    return this;
  };

  return LearningAppsElement.extend('LearningAppsElement', {

    /**
     * Render Embedded content
     * @memberOf LearningAppsElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {
      this.addContent(
          this.renderIframe(
              $(embed).attr('src')
          )
      );
    }

  }, PluginElement.prototype);
});

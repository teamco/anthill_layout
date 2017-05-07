/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineScoffElement(PluginElement) {

  /**
   * Define Scoff Element
   * @param view
   * @param opts
   * @returns {ScoffElement}
   * @constructor
   * @class ScoffElement
   * @extends PluginElement
   */
  var ScoffElement = function ScoffElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('scoff', {resource: '/widgets'});

    return this;
  };

  return ScoffElement.extend('ScoffElement', {

    /**
     * Render Embedded content
     * @memberOf ScoffElement
     * @param {string} embed
     */
    renderEmbeddedContent: function renderEmbeddedContent(embed) {

      // Get player id
      var playerId = this.id + '-player';

      // Replace default id
      embed = embed.replace(/videoElement/g, playerId);

      /**
       * Get element
       * @type {ScoffElement}
       */
      var $element = this;

      $element.addContent('<div id="' + playerId + '"/>');

      try {

        require(
            ['http://jwpsrv.com/library/97CHiO2IEeOGQyIACtqXBA.js'],
            function _loadScript() {
              $element.addContent($(embed)[2]);
            }
        );

      } catch (e) {

        $element.view.scope.logger.warn('Unable to load embed code', e);
      }
    }

  }, PluginElement.prototype);
});

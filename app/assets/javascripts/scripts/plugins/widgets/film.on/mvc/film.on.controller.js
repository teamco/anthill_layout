/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineFilmOnController(PluginBase, WidgetContentController) {

  /**
   * Define FilmOn controller
   * @class FilmOnController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var FilmOnController = function FilmOnController() {
  };

  return FilmOnController.extend('FilmOnController', {

    /**
     * Set embedded content
     * @memberOf FilmOnController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      /**
       * Load config
       * @type {*}
       */
      var mask = this.model.getConfig('mask'),
          channel = this.model.getPrefs('filmonChannelId');

      if (channel) {
        this.view.elements.$filmon.renderEmbeddedContent(
            mask.replace(/\{channel}/, channel)
        );
      }
    },

    /**
     * Add FilmOn rule
     * @memberOf FilmOnController
     * @param {Event} e
     */
    addFilmOnRule: function addFilmOnRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});

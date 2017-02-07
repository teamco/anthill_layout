/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/widgets/sapo.videos/element/sapo.videos.element',
  'plugins/widgets/sapo.videos/element/sapo.videos.preferences.element',
  'plugins/widgets/sapo.videos/element/sapo.videos.rules.element'
], function defineSapoVideosView(BaseView, Header, Footer, SapoVideosElement,
    SapoVideosPreferencesElement, SapoVideosRulesElement) {

  /**
   * Define view
   * @class SapoVideosView
   * @extends BaseView
   * @constructor
   */
  var SapoVideosView = function SapoVideosView() {
  };

  return SapoVideosView.extend('SapoVideosView', {

    /**
     * Render SapoVideos element
     * @memberOf SapoVideosView
     */
    renderSapoVideos: function renderSapoVideos() {

      this.header(Header, this.get$container());

      /**
       * Define $sapovideos
       * @type {SapoVideosElement}
       */
      this.elements.$sapovideos = new SapoVideosElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SapoVideosView
     * @returns {SapoVideosPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define SapoVideos Preferences Element
       * @type {SapoVideosPreferencesElement}
       */
      this.elements.$preferences = new SapoVideosPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SapoVideosView
     * @param widgetRules
     * @param contentRules
     * @returns {SapoVideosRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define SapoVideos Rules Element
       * @type {SapoVideosRulesElement}
       */
      this.elements.$rules = new SapoVideosRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render SapoVideos
     * @memberOf SapoVideosView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSapoVideos.bind(this)
      );
    }

  }, BaseView.prototype);
});

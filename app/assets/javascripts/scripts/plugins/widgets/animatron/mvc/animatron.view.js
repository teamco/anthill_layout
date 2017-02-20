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
  'plugins/widgets/animatron/element/animatron.element',
  'plugins/widgets/animatron/element/animatron.preferences.element',
  'plugins/widgets/animatron/element/animatron.rules.element'
], function defineAnimatronView(BaseView, Header, Footer, AnimatronElement,
    AnimatronPreferencesElement, AnimatronRulesElement) {

  /**
   * Define view
   * @class AnimatronView
   * @extends BaseView
   * @constructor
   */
  var AnimatronView = function AnimatronView() {
  };

  return AnimatronView.extend('AnimatronView', {

    /**
     * Render Animatron element
     * @memberOf AnimatronView
     */
    renderAnimatron: function renderAnimatron() {

      this.header(Header, this.get$container());

      /**
       * Define $animatron
       * @type {AnimatronElement}
       */
      this.elements.$animatron = new AnimatronElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf AnimatronView
     * @returns {AnimatronPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Animatron Preferences Element
       * @type {AnimatronPreferencesElement}
       */
      this.elements.$preferences = new AnimatronPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf AnimatronView
     * @param widgetRules
     * @param contentRules
     * @returns {AnimatronRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Animatron Rules Element
       * @type {AnimatronRulesElement}
       */
      this.elements.$rules = new AnimatronRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Animatron
     * @memberOf AnimatronView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderAnimatron.bind(this)
      );
    }

  }, BaseView.prototype);
});

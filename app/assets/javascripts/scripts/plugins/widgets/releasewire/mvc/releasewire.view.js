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
  'plugins/widgets/releasewire/element/releasewire.element',
  'plugins/widgets/releasewire/element/releasewire.preferences.element',
  'plugins/widgets/releasewire/element/releasewire.rules.element'
], function defineReleasewireView(BaseView, Header, Footer, ReleasewireElement,
    ReleasewirePreferencesElement, ReleasewireRulesElement) {

  /**
   * Define view
   * @class ReleasewireView
   * @extends BaseView
   * @constructor
   */
  var ReleasewireView = function ReleasewireView() {
  };

  return ReleasewireView.extend('ReleasewireView', {

    /**
     * Render Releasewire element
     * @memberOf ReleasewireView
     */
    renderReleasewire: function renderReleasewire() {

      this.header(Header, this.get$container());

      /**
       * Define $releasewire
       * @type {ReleasewireElement}
       */
      this.elements.$releasewire = new ReleasewireElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ReleasewireView
     * @returns {ReleasewirePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Releasewire Preferences Element
       * @type {ReleasewirePreferencesElement}
       */
      this.elements.$preferences = new ReleasewirePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ReleasewireView
     * @param widgetRules
     * @param contentRules
     * @returns {ReleasewireRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Releasewire Rules Element
       * @type {ReleasewireRulesElement}
       */
      this.elements.$rules = new ReleasewireRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Releasewire
     * @memberOf ReleasewireView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderReleasewire.bind(this)
      );
    }

  }, BaseView.prototype);
});

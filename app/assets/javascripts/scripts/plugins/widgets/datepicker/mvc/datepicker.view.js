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
  'plugins/widgets/datepicker/element/datepicker.element',
  'plugins/widgets/datepicker/element/datepicker.preferences.element',
  'plugins/widgets/datepicker/element/datepicker.rules.element'
], function defineDatepickerView(BaseView, Header, Footer, DatepickerElement,
    DatepickerPreferencesElement, DatepickerRulesElement) {

  /**
   * Define view
   * @class DatepickerView
   * @extends BaseView
   * @constructor
   */
  var DatepickerView = function DatepickerView() {
  };

  return DatepickerView.extend('DatepickerView', {

    /**
     * Render Datepicker element
     * @memberOf DatepickerView
     */
    renderDatepicker: function renderDatepicker() {

      this.header(Header, this.get$container());

      /**
       * Define $datepicker
       * @type {DatepickerElement}
       */
      this.elements.$datepicker = new DatepickerElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf DatepickerView
     * @returns {DatepickerPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Datepicker Preferences Element
       * @type {DatepickerPreferencesElement}
       */
      this.elements.$preferences = new DatepickerPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf DatepickerView
     * @param widgetRules
     * @param contentRules
     * @returns {DatepickerRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Datepicker Rules Element
       * @type {DatepickerRulesElement}
       */
      this.elements.$rules = new DatepickerRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Datepicker
     * @memberOf DatepickerView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderDatepicker.bind(this)
      );
    }

  }, BaseView.prototype)

});

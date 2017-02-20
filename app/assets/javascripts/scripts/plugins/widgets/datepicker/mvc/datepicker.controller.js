/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineDatepickerController(PluginBase, WidgetContentController) {

  /**
   * Define Datepicker controller
   * @class DatepickerController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var DatepickerController = function DatepickerController() {
  };

  return DatepickerController.extend('DatepickerController', {

    /**
     * Set embedded content
     * @memberOf DatepickerController
     */
    setEmbeddedContent: function setEmbeddedContent() {
      this.view.elements.$datepicker.renderEmbeddedContent({
        showWeek: this.model.getPrefs('datepickerShowWeek'),
        firstDay: this.model.getPrefs('datepickerFirstDay')
      });
    },

    /**
     * Add Datepicker rule
     * @memberOf DatepickerController
     * @param {Event} e
     */
    addDatepickerRule: function addDatepickerRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineDatepickerRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Datepicker Rules Element
   * @param view
   * @param opts
   * @returns {DatepickerRulesElement}
   * @constructor
   * @class DatepickerRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var DatepickerRulesElement = function DatepickerRulesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBaseRulesData(
        opts.data,
        opts.rules.widget,
        opts.rules.content
    );

    return this;
  };

  return DatepickerRulesElement.extend('DatepickerRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

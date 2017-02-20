/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineTimeToastRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TimeToast Rules Element
   * @param view
   * @param opts
   * @returns {TimeToastRulesElement}
   * @constructor
   * @class TimeToastRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TimeToastRulesElement = function TimeToastRulesElement(view, opts) {

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

  return TimeToastRulesElement.extend('TimeToastRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

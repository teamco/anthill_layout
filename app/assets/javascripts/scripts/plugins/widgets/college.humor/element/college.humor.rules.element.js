/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineCollegeHumorRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define CollegeHumor Rules Element
   * @param view
   * @param opts
   * @returns {CollegeHumorRulesElement}
   * @constructor
   * @class CollegeHumorRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var CollegeHumorRulesElement = function CollegeHumorRulesElement(view, opts) {

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

  return CollegeHumorRulesElement.extend('CollegeHumorRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

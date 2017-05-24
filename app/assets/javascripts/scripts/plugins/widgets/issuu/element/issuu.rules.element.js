/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineIssuuRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Issuu Rules Element
   * @param view
   * @param opts
   * @returns {IssuuRulesElement}
   * @constructor
   * @class IssuuRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var IssuuRulesElement = function IssuuRulesElement(view, opts) {

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

  return IssuuRulesElement.extend('IssuuRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

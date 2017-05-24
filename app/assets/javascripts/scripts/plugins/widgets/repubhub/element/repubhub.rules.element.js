/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineRepubhubRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Repubhub Rules Element
   * @param view
   * @param opts
   * @returns {RepubhubRulesElement}
   * @constructor
   * @class RepubhubRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var RepubhubRulesElement = function RepubhubRulesElement(view, opts) {

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

  return RepubhubRulesElement.extend(
      'RepubhubRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

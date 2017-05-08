/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSwayRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Sway Rules Element
   * @param view
   * @param opts
   * @returns {SwayRulesElement}
   * @constructor
   * @class SwayRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SwayRulesElement = function SwayRulesElement(view, opts) {

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

  return SwayRulesElement.extend(
      'SwayRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

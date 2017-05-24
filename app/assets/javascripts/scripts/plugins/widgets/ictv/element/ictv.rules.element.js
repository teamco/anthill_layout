/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineIctvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Ictv Rules Element
   * @param view
   * @param opts
   * @returns {IctvRulesElement}
   * @constructor
   * @class IctvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var IctvRulesElement = function IctvRulesElement(view, opts) {

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

  return IctvRulesElement.extend('IctvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

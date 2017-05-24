/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineScreenrRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Screenr Rules Element
   * @param view
   * @param opts
   * @returns {ScreenrRulesElement}
   * @constructor
   * @class ScreenrRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ScreenrRulesElement = function ScreenrRulesElement(view, opts) {

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

  return ScreenrRulesElement.extend('ScreenrRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

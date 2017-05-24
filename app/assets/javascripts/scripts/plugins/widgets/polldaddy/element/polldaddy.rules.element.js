/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function definePolldaddyRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Polldaddy Rules Element
   * @param view
   * @param opts
   * @returns {PolldaddyRulesElement}
   * @constructor
   * @class PolldaddyRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PolldaddyRulesElement = function PolldaddyRulesElement(view, opts) {

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

  return PolldaddyRulesElement.extend('PolldaddyRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

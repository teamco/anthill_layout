/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineUstreamRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Ustream Rules Element
   * @param view
   * @param opts
   * @returns {UstreamRulesElement}
   * @constructor
   * @class UstreamRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var UstreamRulesElement = function UstreamRulesElement(view, opts) {

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

  return UstreamRulesElement.extend('UstreamRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

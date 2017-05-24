/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineOneTwelveChannelUaRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define OneTwelveChannelUa Rules Element
   * @param view
   * @param opts
   * @returns {OneTwelveChannelUaRulesElement}
   * @constructor
   * @class OneTwelveChannelUaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var OneTwelveChannelUaRulesElement = function OneTwelveChannelUaRulesElement(view,
      opts) {

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

  return OneTwelveChannelUaRulesElement.extend('OneTwelveChannelUaRulesElement',
      {}, PluginElement.prototype, BaseWidgetRules.prototype);

});

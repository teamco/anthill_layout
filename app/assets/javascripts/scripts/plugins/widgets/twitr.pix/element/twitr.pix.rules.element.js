/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineTwitrPixRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TwitrPix Rules Element
   * @param view
   * @param opts
   * @returns {TwitrPixRulesElement}
   * @constructor
   * @class TwitrPixRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TwitrPixRulesElement = function TwitrPixRulesElement(view, opts) {

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

  return TwitrPixRulesElement.extend('TwitrPixRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineQuicktimeRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Quicktime Rules Element
   * @param view
   * @param opts
   * @returns {QuicktimeRulesElement}
   * @constructor
   * @class QuicktimeRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var QuicktimeRulesElement = function QuicktimeRulesElement(view, opts) {

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

  return QuicktimeRulesElement.extend('QuicktimeRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
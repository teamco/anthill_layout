/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineTwentyFourLiveRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TwentyFourLive Rules Element
   * @param view
   * @param opts
   * @returns {TwentyFourLiveRulesElement}
   * @constructor
   * @class TwentyFourLiveRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TwentyFourLiveRulesElement = function TwentyFourLiveRulesElement(view,
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

  return TwentyFourLiveRulesElement.extend('TwentyFourLiveRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

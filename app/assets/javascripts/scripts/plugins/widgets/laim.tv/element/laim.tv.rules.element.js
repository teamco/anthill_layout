/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineLaimTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define LaimTv Rules Element
   * @param view
   * @param opts
   * @returns {LaimTvRulesElement}
   * @constructor
   * @class LaimTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LaimTvRulesElement = function LaimTvRulesElement(view, opts) {

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

  return LaimTvRulesElement.extend(
      'LaimTvRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

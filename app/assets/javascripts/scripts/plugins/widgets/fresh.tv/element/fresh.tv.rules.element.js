/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineFreshTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define FreshTv Rules Element
   * @param view
   * @param opts
   * @returns {FreshTvRulesElement}
   * @constructor
   * @class FreshTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var FreshTvRulesElement = function FreshTvRulesElement(view, opts) {

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

  return FreshTvRulesElement.extend('FreshTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function definePikTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define PikTv Rules Element
   * @param view
   * @param opts
   * @returns {PikTvRulesElement}
   * @constructor
   * @class PikTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PikTvRulesElement = function PikTvRulesElement(view, opts) {

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

  return PikTvRulesElement.extend('PikTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

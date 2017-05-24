/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineBlipTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define BlipTv Rules Element
   * @param view
   * @param opts
   * @returns {BlipTvRulesElement}
   * @constructor
   * @class BlipTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var BlipTvRulesElement = function BlipTvRulesElement(view, opts) {

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

  return BlipTvRulesElement.extend('BlipTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

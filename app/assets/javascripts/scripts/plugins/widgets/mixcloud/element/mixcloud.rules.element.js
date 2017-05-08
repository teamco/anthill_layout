/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineMixcloudRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Mixcloud Rules Element
   * @param view
   * @param opts
   * @returns {MixcloudRulesElement}
   * @constructor
   * @class MixcloudRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MixcloudRulesElement = function MixcloudRulesElement(view, opts) {

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

  return MixcloudRulesElement.extend('MixcloudRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineReleasewireRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Releasewire Rules Element
   * @param view
   * @param opts
   * @returns {ReleasewireRulesElement}
   * @constructor
   * @class ReleasewireRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ReleasewireRulesElement = function ReleasewireRulesElement(view, opts) {

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

  return ReleasewireRulesElement.extend(
      'ReleasewireRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

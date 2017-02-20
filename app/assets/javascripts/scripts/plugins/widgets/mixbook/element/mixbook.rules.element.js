/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineMixbookRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Mixbook Rules Element
   * @param view
   * @param opts
   * @returns {MixbookRulesElement}
   * @constructor
   * @class MixbookRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MixbookRulesElement = function MixbookRulesElement(view, opts) {

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

  return MixbookRulesElement.extend('MixbookRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

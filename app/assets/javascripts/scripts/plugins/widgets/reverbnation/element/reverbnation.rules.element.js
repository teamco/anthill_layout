/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineReverbnationRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Reverbnation Rules Element
   * @param view
   * @param opts
   * @returns {ReverbnationRulesElement}
   * @constructor
   * @class ReverbnationRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ReverbnationRulesElement = function ReverbnationRulesElement(view, opts) {

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

  return ReverbnationRulesElement.extend(
      'ReverbnationRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

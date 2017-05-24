/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineLiveAmchartsRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define LiveAmcharts Rules Element
   * @param view
   * @param opts
   * @returns {LiveAmchartsRulesElement}
   * @constructor
   * @class LiveAmchartsRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LiveAmchartsRulesElement = function LiveAmchartsRulesElement(view, opts) {

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

  return LiveAmchartsRulesElement.extend(
      'LiveAmchartsRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

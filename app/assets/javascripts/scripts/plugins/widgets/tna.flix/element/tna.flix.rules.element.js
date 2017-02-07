/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineTnaFlixRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TnaFlix Rules Element
   * @param view
   * @param opts
   * @returns {TnaFlixRulesElement}
   * @constructor
   * @class TnaFlixRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TnaFlixRulesElement = function TnaFlixRulesElement(view, opts) {

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

  return TnaFlixRulesElement.extend('TnaFlixRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineScribdRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Scribd Rules Element
   * @param view
   * @param opts
   * @returns {ScribdRulesElement}
   * @constructor
   * @class ScribdRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var ScribdRulesElement = function ScribdRulesElement(view, opts) {

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

  return ScribdRulesElement.extend('ScribdRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

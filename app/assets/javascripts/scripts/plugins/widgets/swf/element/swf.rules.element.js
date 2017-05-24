/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSwfRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Swf Rules Element
   * @param view
   * @param opts
   * @returns {SwfRulesElement}
   * @constructor
   * @class SwfRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SwfRulesElement = function SwfRulesElement(view, opts) {

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

  return SwfRulesElement.extend('SwfRulesElement', {}, PluginElement.prototype,
      BaseWidgetRules.prototype);

});
/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineXkcdRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Xkcd Rules Element
   * @param view
   * @param opts
   * @returns {XkcdRulesElement}
   * @constructor
   * @class XkcdRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var XkcdRulesElement = function XkcdRulesElement(view, opts) {

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

  return XkcdRulesElement.extend('XkcdRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineGiphyRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Giphy Rules Element
   * @param view
   * @param opts
   * @returns {GiphyRulesElement}
   * @constructor
   * @class GiphyRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var GiphyRulesElement = function GiphyRulesElement(view, opts) {

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

  return GiphyRulesElement.extend('GiphyRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineLivestreamRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Livestream Rules Element
   * @param view
   * @param opts
   * @returns {LivestreamRulesElement}
   * @constructor
   * @class LivestreamRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var LivestreamRulesElement = function LivestreamRulesElement(view, opts) {

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

  return LivestreamRulesElement.extend('LivestreamRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

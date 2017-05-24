/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineMusTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define MusTv Rules Element
   * @param view
   * @param opts
   * @returns {MusTvRulesElement}
   * @constructor
   * @class MusTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MusTvRulesElement = function MusTvRulesElement(view, opts) {

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

  return MusTvRulesElement.extend('MusTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

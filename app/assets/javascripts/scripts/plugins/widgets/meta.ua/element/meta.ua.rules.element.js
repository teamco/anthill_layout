/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineMetaUaRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define MetaUa Rules Element
   * @param view
   * @param opts
   * @returns {MetaUaRulesElement}
   * @constructor
   * @class MetaUaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var MetaUaRulesElement = function MetaUaRulesElement(view, opts) {

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

  return MetaUaRulesElement.extend('MetaUaRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineEspresoTvRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define EspresoTv Rules Element
   * @param view
   * @param opts
   * @returns {EspresoTvRulesElement}
   * @constructor
   * @class EspresoTvRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var EspresoTvRulesElement = function EspresoTvRulesElement(view, opts) {

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

  return EspresoTvRulesElement.extend('EspresoTvRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

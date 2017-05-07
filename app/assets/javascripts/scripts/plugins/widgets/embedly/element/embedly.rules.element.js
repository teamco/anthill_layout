/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineEmbedlyRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Embedly Rules Element
   * @param view
   * @param opts
   * @returns {EmbedlyRulesElement}
   * @constructor
   * @class EmbedlyRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var EmbedlyRulesElement = function EmbedlyRulesElement(view, opts) {

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

  return EmbedlyRulesElement.extend('EmbedlyRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

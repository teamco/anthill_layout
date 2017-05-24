/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineEmbedArticlesRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define EmbedArticles Rules Element
   * @param view
   * @param opts
   * @returns {EmbedArticlesRulesElement}
   * @constructor
   * @class EmbedArticlesRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var EmbedArticlesRulesElement = function EmbedArticlesRulesElement(view,
      opts) {

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

  return EmbedArticlesRulesElement.extend(
      'EmbedArticlesRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

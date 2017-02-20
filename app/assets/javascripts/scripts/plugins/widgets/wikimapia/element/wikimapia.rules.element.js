/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineWikimapiaRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Wikimapia Rules Element
   * @param view
   * @param opts
   * @returns {WikimapiaRulesElement}
   * @constructor
   * @class WikimapiaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var WikimapiaRulesElement = function WikimapiaRulesElement(view, opts) {

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

  return WikimapiaRulesElement.extend(
      'WikimapiaRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

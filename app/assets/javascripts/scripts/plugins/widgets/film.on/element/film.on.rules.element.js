/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineFilmOnRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define FilmOn Rules Element
   * @param view
   * @param opts
   * @returns {FilmOnRulesElement}
   * @constructor
   * @class FilmOnRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var FilmOnRulesElement = function FilmOnRulesElement(view, opts) {

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

  return FilmOnRulesElement.extend('FilmOnRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});

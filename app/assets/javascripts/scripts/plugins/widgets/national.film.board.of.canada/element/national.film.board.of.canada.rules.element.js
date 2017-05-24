/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineNationalFilmBoardOfCanadaRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define NationalFilmBoardOfCanada Rules Element
   * @param view
   * @param opts
   * @returns {NationalFilmBoardOfCanadaRulesElement}
   * @constructor
   * @class NationalFilmBoardOfCanadaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var NationalFilmBoardOfCanadaRulesElement = function NationalFilmBoardOfCanadaRulesElement(view,
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

  return NationalFilmBoardOfCanadaRulesElement.extend(
      'NationalFilmBoardOfCanadaRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});

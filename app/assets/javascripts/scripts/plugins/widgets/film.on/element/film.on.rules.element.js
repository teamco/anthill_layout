/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFilmOnRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FilmOn Rules Element
     * @param view
     * @param opts
     * @returns {FilmOnRulesElement}
     * @constructor
     * @class FilmOnRulesElement
     * @extends BaseElement
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

    return FilmOnRulesElement.extend('FilmOnRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFilmRuRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define FilmRu Rules Element
     * @param view
     * @param opts
     * @returns {FilmRuRulesElement}
     * @constructor
     * @class FilmRuRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FilmRuRulesElement = function FilmRuRulesElement(view, opts) {

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

    return FilmRuRulesElement.extend(
        'FilmRuRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineKeezMoviesRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define KeezMovies Rules Element
     * @param view
     * @param opts
     * @returns {KeezMoviesRulesElement}
     * @constructor
     * @class KeezMoviesRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var KeezMoviesRulesElement = function KeezMoviesRulesElement(view, opts) {

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

    return KeezMoviesRulesElement.extend('KeezMoviesRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

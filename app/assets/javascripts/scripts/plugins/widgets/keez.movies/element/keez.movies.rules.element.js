/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineKeezMoviesRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define KeezMovies Rules Element
     * @param view
     * @param opts
     * @returns {KeezMoviesRulesElement}
     * @constructor
     * @class KeezMoviesRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var KeezMoviesRulesElement = function KeezMoviesRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

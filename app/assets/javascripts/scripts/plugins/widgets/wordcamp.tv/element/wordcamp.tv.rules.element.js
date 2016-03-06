/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineWordcampTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define WordcampTv Rules Element
     * @param view
     * @param opts
     * @returns {WordcampTvRulesElement}
     * @constructor
     * @class WordcampTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var WordcampTvRulesElement = function WordcampTvRulesElement(view, opts) {

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

    return WordcampTvRulesElement.extend('WordcampTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

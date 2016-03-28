/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineWordcampTvRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define WordcampTv Rules Element
     * @param view
     * @param opts
     * @returns {WordcampTvRulesElement}
     * @constructor
     * @class WordcampTvRulesElement
     * @extends PluginElement
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

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

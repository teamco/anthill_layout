/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineBlipTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define BlipTv Rules Element
     * @param view
     * @param opts
     * @returns {BlipTvRulesElement}
     * @constructor
     * @class BlipTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var BlipTvRulesElement = function BlipTvRulesElement(view, opts) {

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

    return BlipTvRulesElement.extend('BlipTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

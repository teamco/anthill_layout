/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMusTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define MusTv Rules Element
     * @param view
     * @param opts
     * @returns {MusTvRulesElement}
     * @constructor
     * @class MusTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MusTvRulesElement = function MusTvRulesElement(view, opts) {

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

    return MusTvRulesElement.extend('MusTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

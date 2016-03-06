/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineRutubeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Rutube Rules Element
     * @param view
     * @param opts
     * @returns {RutubeRulesElement}
     * @constructor
     * @class RutubeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var RutubeRulesElement = function RutubeRulesElement(view, opts) {

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

    return RutubeRulesElement.extend('RutubeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFapaTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FapaTv Rules Element
     * @param view
     * @param opts
     * @returns {FapaTvRulesElement}
     * @constructor
     * @class FapaTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FapaTvRulesElement = function FapaTvRulesElement(view, opts) {

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

    return FapaTvRulesElement.extend('FapaTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

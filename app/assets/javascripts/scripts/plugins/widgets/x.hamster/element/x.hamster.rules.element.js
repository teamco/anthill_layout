/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineXHamsterRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define XHamster Rules Element
     * @param view
     * @param opts
     * @returns {XHamsterRulesElement}
     * @constructor
     * @class XHamsterRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var XHamsterRulesElement = function XHamsterRulesElement(view, opts) {

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

    return XHamsterRulesElement.extend('XHamsterRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSwfRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Swf Rules Element
     * @param view
     * @param opts
     * @returns {SwfRulesElement}
     * @constructor
     * @class SwfRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SwfRulesElement = function SwfRulesElement(view, opts) {

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

    return SwfRulesElement.extend('SwfRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
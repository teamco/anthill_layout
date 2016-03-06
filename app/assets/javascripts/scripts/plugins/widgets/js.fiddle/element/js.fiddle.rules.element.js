/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineJsFiddleRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define JsFiddle Rules Element
     * @param view
     * @param opts
     * @returns {JsFiddleRulesElement}
     * @constructor
     * @class JsFiddleRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var JsFiddleRulesElement = function JsFiddleRulesElement(view, opts) {

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

    return JsFiddleRulesElement.extend('JsFiddleRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

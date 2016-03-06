/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineYouPornRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define YouPorn Rules Element
     * @param view
     * @param opts
     * @returns {YouPornRulesElement}
     * @constructor
     * @class YouPornRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var YouPornRulesElement = function YouPornRulesElement(view, opts) {

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

    return YouPornRulesElement.extend('YouPornRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

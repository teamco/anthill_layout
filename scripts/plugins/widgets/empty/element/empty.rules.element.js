/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function defineEmptyRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Empty Rules Element
     * @param view
     * @param opts
     * @returns {EmptyRulesElement}
     * @constructor
     * @class EmptyRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var EmptyRulesElement = function EmptyRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return EmptyRulesElement.extend('EmptyRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
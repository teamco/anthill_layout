/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineAnimotoRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Animoto Rules Element
     * @param view
     * @param opts
     * @returns {AnimotoRulesElement}
     * @constructor
     * @class AnimotoRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var AnimotoRulesElement = function AnimotoRulesElement(view, opts) {

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

    return AnimotoRulesElement.extend('AnimotoRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

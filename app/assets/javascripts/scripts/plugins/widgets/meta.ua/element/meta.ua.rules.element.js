/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMetaUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define MetaUa Rules Element
     * @param view
     * @param opts
     * @returns {MetaUaRulesElement}
     * @constructor
     * @class MetaUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MetaUaRulesElement = function MetaUaRulesElement(view, opts) {

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

    return MetaUaRulesElement.extend('MetaUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

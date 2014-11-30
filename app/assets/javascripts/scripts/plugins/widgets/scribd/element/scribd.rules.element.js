/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineScribdRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Scribd Rules Element
     * @param view
     * @param opts
     * @returns {ScribdRulesElement}
     * @constructor
     * @class ScribdRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ScribdRulesElement = function ScribdRulesElement(view, opts) {

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

    return ScribdRulesElement.extend('ScribdRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

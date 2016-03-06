/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineLiveLeakRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define LiveLeak Rules Element
     * @param view
     * @param opts
     * @returns {LiveLeakRulesElement}
     * @constructor
     * @class LiveLeakRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var LiveLeakRulesElement = function LiveLeakRulesElement(view, opts) {

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

    return LiveLeakRulesElement.extend('LiveLeakRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

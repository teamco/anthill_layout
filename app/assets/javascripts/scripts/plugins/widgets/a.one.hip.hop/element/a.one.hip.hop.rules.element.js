/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineAOneHipHopRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define AOneHipHop Rules Element
     * @param view
     * @param opts
     * @returns {AOneHipHopRulesElement}
     * @constructor
     * @class AOneHipHopRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var AOneHipHopRulesElement = function AOneHipHopRulesElement(view, opts) {

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

    return AOneHipHopRulesElement.extend('AOneHipHopRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTubeEightRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TubeEight Rules Element
     * @param view
     * @param opts
     * @returns {TubeEightRulesElement}
     * @constructor
     * @class TubeEightRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TubeEightRulesElement = function TubeEightRulesElement(view, opts) {

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

    return TubeEightRulesElement.extend('TubeEightRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

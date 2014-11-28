/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineHromadskeTvRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define HromadskeTv Rules Element
     * @param view
     * @param opts
     * @returns {HromadskeTvRulesElement}
     * @constructor
     * @class HromadskeTvRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var HromadskeTvRulesElement = function HromadskeTvRulesElement(view, opts) {

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

    return HromadskeTvRulesElement.extend('HromadskeTvRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

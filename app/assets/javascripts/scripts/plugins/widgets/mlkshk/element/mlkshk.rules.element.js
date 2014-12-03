/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineMlkshkRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Mlkshk Rules Element
     * @param view
     * @param opts
     * @returns {MlkshkRulesElement}
     * @constructor
     * @class MlkshkRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var MlkshkRulesElement = function MlkshkRulesElement(view, opts) {

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

    return MlkshkRulesElement.extend('MlkshkRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineVineCoRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define VineCo Rules Element
     * @param view
     * @param opts
     * @returns {VineCoRulesElement}
     * @constructor
     * @class VineCoRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var VineCoRulesElement = function VineCoRulesElement(view, opts) {

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

    return VineCoRulesElement.extend('VineCoRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineBigmirNetRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define BigmirNet Rules Element
     * @param view
     * @param opts
     * @returns {BigmirNetRulesElement}
     * @constructor
     * @class BigmirNetRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var BigmirNetRulesElement = function BigmirNetRulesElement(view, opts) {

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

    return BigmirNetRulesElement.extend('BigmirNetRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

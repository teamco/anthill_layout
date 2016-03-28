/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePremiereTvRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define PremiereTv Rules Element
     * @param view
     * @param opts
     * @returns {PremiereTvRulesElement}
     * @constructor
     * @class PremiereTvRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PremiereTvRulesElement = function PremiereTvRulesElement(view, opts) {

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

    return PremiereTvRulesElement.extend('PremiereTvRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

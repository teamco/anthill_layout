/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFapaTvRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define FapaTv Rules Element
     * @param view
     * @param opts
     * @returns {FapaTvRulesElement}
     * @constructor
     * @class FapaTvRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FapaTvRulesElement = function FapaTvRulesElement(view, opts) {

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

    return FapaTvRulesElement.extend('FapaTvRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

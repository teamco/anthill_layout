/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineKalturaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Kaltura Rules Element
     * @param view
     * @param opts
     * @returns {KalturaRulesElement}
     * @constructor
     * @class KalturaRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var KalturaRulesElement = function KalturaRulesElement(view, opts) {

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

    return KalturaRulesElement.extend(
        'KalturaRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});

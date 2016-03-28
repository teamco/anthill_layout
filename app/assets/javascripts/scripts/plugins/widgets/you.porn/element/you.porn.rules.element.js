/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineYouPornRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define YouPorn Rules Element
     * @param view
     * @param opts
     * @returns {YouPornRulesElement}
     * @constructor
     * @class YouPornRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var YouPornRulesElement = function YouPornRulesElement(view, opts) {

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

    return YouPornRulesElement.extend('YouPornRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

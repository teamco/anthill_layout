/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineJwplayerRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Jwplayer Rules Element
     * @param view
     * @param opts
     * @returns {JwplayerRulesElement}
     * @constructor
     * @class JwplayerRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var JwplayerRulesElement = function JwplayerRulesElement(view, opts) {

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

    return JwplayerRulesElement.extend('JwplayerRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
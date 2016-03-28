/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineTinyPicRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define TinyPic Rules Element
     * @param view
     * @param opts
     * @returns {TinyPicRulesElement}
     * @constructor
     * @class TinyPicRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var TinyPicRulesElement = function TinyPicRulesElement(view, opts) {

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

    return TinyPicRulesElement.extend('TinyPicRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

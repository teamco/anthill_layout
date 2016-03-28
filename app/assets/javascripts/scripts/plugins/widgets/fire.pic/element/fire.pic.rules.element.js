/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFirePicRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define FirePic Rules Element
     * @param view
     * @param opts
     * @returns {FirePicRulesElement}
     * @constructor
     * @class FirePicRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FirePicRulesElement = function FirePicRulesElement(view, opts) {

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

    return FirePicRulesElement.extend('FirePicRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

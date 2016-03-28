/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePhotobucketRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Photobucket Rules Element
     * @param view
     * @param opts
     * @returns {PhotobucketRulesElement}
     * @constructor
     * @class PhotobucketRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PhotobucketRulesElement = function PhotobucketRulesElement(view, opts) {

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

    return PhotobucketRulesElement.extend('PhotobucketRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

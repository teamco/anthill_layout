/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFlickrRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Flickr Rules Element
     * @param view
     * @param opts
     * @returns {FlickrRulesElement}
     * @constructor
     * @class FlickrRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FlickrRulesElement = function FlickrRulesElement(view, opts) {

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

    return FlickrRulesElement.extend('FlickrRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});

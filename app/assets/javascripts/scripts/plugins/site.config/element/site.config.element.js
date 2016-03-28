/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSiteConfigElement(PluginElement) {

    /**
     * Define SiteConfig Element
     * @param view
     * @param opts
     * @constructor
     * @class SiteConfigElement
     * @type {Function}
     * @extends PluginElement
     * @returns {SiteConfigElement}
     */
    var SiteConfigElement = function SiteConfigElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('site.config');
        this.addCSS('preferences');

        return this;
    };

    return SiteConfigElement.extend('SiteConfigElement', {}, PluginElement.prototype);
});
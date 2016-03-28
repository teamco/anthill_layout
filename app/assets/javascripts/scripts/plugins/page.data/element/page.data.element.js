/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePageDataElement(PluginElement) {

    /**
     * Define PageData Element
     * @param view
     * @param opts
     * @returns {PageDataElement}
     * @constructor
     * @class PageDataElement
     * @extends PluginElement
     */
    var PageDataElement = function PageDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('page.data');
        this.addCSS('preferences');

        return this;
    };

    return PageDataElement.extend('PageDataElement', {
    }, PluginElement.prototype);
});
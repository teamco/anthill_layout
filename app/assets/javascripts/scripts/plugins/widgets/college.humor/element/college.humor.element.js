/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineCollegeHumorElement(PluginElement) {

    /**
     * Define CollegeHumor Element
     * @param view
     * @param opts
     * @returns {CollegeHumorElement}
     * @constructor
     * @class CollegeHumorElement
     * @extends PluginElement
     */
    var CollegeHumorElement = function CollegeHumorElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('college.humor', {resource: '/widgets'});

        return this;
    };

    return CollegeHumorElement.extend('CollegeHumorElement', {

        /**
         * Render Embedded content
         * @memberOf CollegeHumorElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url, {
                    scrolling: 'yes'
                })
            );
        }

    }, PluginElement.prototype);

});

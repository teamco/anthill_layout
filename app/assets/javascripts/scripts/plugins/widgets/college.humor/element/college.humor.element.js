/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineCollegeHumorElement(BaseElement) {

    /**
     * Define CollegeHumor Element
     * @param view
     * @param opts
     * @returns {CollegeHumorElement}
     * @constructor
     * @class CollegeHumorElement
     * @extends BaseElement
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

    }, BaseElement.prototype);

});

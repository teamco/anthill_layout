/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineEmpflixElement(BaseElement) {

    /**
     * Define Empflix Element
     * @param view
     * @param opts
     * @returns {EmpflixElement}
     * @constructor
     * @class EmpflixElement
     * @extends BaseElement
     */
    var EmpflixElement = function EmpflixElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('empflix', {resource: '/widgets'});

        return this;
    };

    return EmpflixElement.extend('EmpflixElement', {

        /**
         * Render Embedded content
         * @member EmpflixElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});

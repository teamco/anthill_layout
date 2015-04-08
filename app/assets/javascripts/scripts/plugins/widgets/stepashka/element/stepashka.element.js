/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineStepashkaElement(BaseElement) {

    /**
     * Define Stepashka Element
     * @param view
     * @param opts
     * @returns {StepashkaElement}
     * @constructor
     * @class StepashkaElement
     * @extends BaseElement
     */
    var StepashkaElement = function StepashkaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('stepashka', {resource: '/widgets'});

        return this;
    };

    return StepashkaElement.extend('StepashkaElement', {

        /**
         * Render Embedded content
         * @memberOf StepashkaElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                this.renderIframe(url)
            );
        }

    }, BaseElement.prototype);

});

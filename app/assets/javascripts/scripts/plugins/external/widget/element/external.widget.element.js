/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineExternalElement(BaseElement) {

    /**
     * Define External Element
     * @constructor
     * @class ExternalElement
     * @extends BaseElement
     * @param {ExternalView} view
     * @param opts
     * @returns {ExternalElement}
     */
    var ExternalElement = function ExternalElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('external.widget', {resource: '/widgets'});

        return this;
    };

    return ExternalElement.extend('ExternalElement', {

        /**
         * Render Embedded content
         * @memberOf ExternalElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

        }

    }, BaseElement.prototype);
});
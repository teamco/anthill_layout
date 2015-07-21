/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineClocklinkElement(BaseElement) {

    /**
     * Define Clocklink Element
     * @param view
     * @param opts
     * @returns {ClocklinkElement}
     * @constructor
     * @class ClocklinkElement
     * @extends BaseElement
     */
    var ClocklinkElement = function ClocklinkElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('clocklink', {resource: '/widgets'});

        return this;
    };

    return ClocklinkElement.extend('ClocklinkElement', {

        /**
         * Render Embedded content
         * @memberOf ClocklinkElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, BaseElement.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineStatisticsElement(BaseElement) {

    /**
     * Define Statistics Element
     * @param view
     * @param opts
     * @returns {StatisticsElement}
     * @constructor
     * @class StatisticsElement
     * @extends BaseElement
     */
    var StatisticsElement = function StatisticsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('statistics', {resource: '/widgets'});

        return this;
    };

    return StatisticsElement.extend('StatisticsElement', {

        /**
         * Render Embedded content
         * @member StatisticsElement
         * @param {string} text
         */
        renderEmbeddedContent: function renderEmbeddedContent(text) {

            require([
           //     'plugns/.............../highchart'
            ], function defineChart(){

          //      logic...

            })

        }


    }, BaseElement.prototype);

});
/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineImageElement(BaseElement) {

    /**
     * Define Image Element
     * @param view
     * @param opts
     * @returns {ImageElement}
     * @constructor
     * @class ImageElement
     * @extends BaseElement
     */
    var ImageElement = function ImageElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('image', {resource: '/widgets'});
        this.attachStatisticsCollector();
        return this;
    };

    return ImageElement.extend('ImageElement', {

        /**
         * Render Embedded content
         * @member ImageElement
         * @param {string} url
         * @param {string} text
         */
        renderEmbeddedContent: function renderEmbeddedContent(url, text) {

            if (!url) {
                return false;
            }

            /**
             * Define embedded template
             * @type {string}
             */
            this.setHtml(
                $('<img />').attr({
                    src: url,
                    alt: text,
                    title: text
                })
            );

        },

        attachStatisticsCollector : function attachStatisticsCollector() {

            this.$.on('click.statistics',function clickStatisticsCallback(e) {
                this.view.scope.observer.publish(
                    this.view.scope.eventmanager.eventList.bindStatistics,
                    e
                );
            }.bind(this))
        }

    }, BaseElement.prototype);

});
/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'element/widget/widget.content.element',
    'element/widget/widget.comment.element',
    'element/widget/widget.expander.element',
    'element/widget/widget.element'
], function defineWidgetView(AntHill, BaseView, Header, Footer, WidgetContentElement, WidgetCommentElement, WidgetExpanderElement, WidgetElement) {

    /**
     * Define Widget View
     * @constructor
     * @class WidgetView
     * @extends AntHill
     * @extends BaseView
     */
    var WidgetView = function WidgetView() {
    };

    return WidgetView.extend('WidgetView', {

        /**
         * Render widget
         * @memberOf WidgetView
         */
        renderWidget: function renderWidget() {

            /**
             * Define $widget
             * @type {WidgetElement}
             */
            this.elements.$widget = new WidgetElement(this, {
                id: this.createUUID(),
                style: [
                    this.createStyle(),
                    this.scope.config.type
                ].join(' '),
                $container: this.getContainerSelector()
            });

            this.scope.map.setPosition();

            this.header(Header, this.elements.$widget);
            this.content();
            this.contentSharing();
            this.footer(Footer, this.elements.$widget);
        },

        /**
         * Render content
         * @memberOf WidgetView
         */
        content: function content() {

            /**
             * Define $content
             * @type {WidgetContentElement}
             */
            this.elements.$content = new WidgetContentElement(this, {
                style: 'content',
                resource: this.controller.getResource(),
                thumbnail: this.controller.getThumbnail(),
                $container: this.elements.$widget.$
            });
        },

        /**
         * Render content expander
         * @memberOf WidgetView
         */
        contentExpander: function contentExpander() {

            /**
             * Define $expander
             * @type {WidgetExpanderElement}
             */
            this.elements.$expander = new WidgetExpanderElement(this, {
                style: 'expander',
                $container: this.elements.$widget.$
            });
        },

        /**
         * Render comments
         * @memberOf WidgetView
         */
        contentComments: function contentComments() {

            /**
             * Define $comments
             * @type {WidgetCommentElement}
             */
            this.elements.$comments = new WidgetCommentElement(this, {
                style: 'comments',
                $container: this.elements.$widget.$
            });
        },

        contentSharing: function contentSharing() {

        },

        /**
         * Render widget
         * @memberOf WidgetView
         * @param {boolean} silent
         */
        render: function render(silent) {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                silent
            );
        }

    }, AntHill.prototype, BaseView.prototype)

});
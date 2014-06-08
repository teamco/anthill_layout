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
    'element/widget/widget.element.content',
    'element/widget/widget.element'
], function defineWidgetView(AntHill, BaseView, Header, Footer, Content, Widget) {

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
         * @member WidgetView
         */
        renderWidget: function renderWidget() {

            /**
             * Define $widget
             * @type {WidgetElement}
             */
            this.elements.$widget = new Widget(this, {
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
            this.footer(Footer, this.elements.$widget);
        },

        /**
         * Render content
         * @member WidgetView
         */
        content: function content() {

            /**
             * Define $content
             * @type {WidgetContentElement}
             */
            this.elements.$content = new Content(this, {
                style: 'content',
                resource: this.controller.getResource(),
                thumbnail: this.controller.getThumbnail(),
                $container: this.elements.$widget.$
            });
        },

        /**
         * Render widget
         * @member WidgetView
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
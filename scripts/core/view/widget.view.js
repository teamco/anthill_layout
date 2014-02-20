/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'element/widget/widget.element.content',
    'element/widget/widget.element'
], function defineWidgetView(BaseView, Header, Footer, Content, Widget) {

    /**
     * Define Widget View
     * @constructor
     * @class View
     */
    var View = function View() {
        this.elements = {};
    };

    return View.extend({

        /*
         newWidgetDimensions: function newWidgetDimensions() {
         var lastOccupiedRow = this.layout.html.rowsBasedOnWidgets(),
         widgetDims = this.computeWidgetDims(
         this.config.newWidgetSpan[0],
         this.config.newWidgetSpan[1]
         );
         return {
         // Add the widget to next empty slot - if rows are empty, add to it the first one
         top: this.widgetTop({
         row: lastOccupiedRow < 0 ?
         0 : lastOccupiedRow
         }),
         left: this.widgetLeft({
         column: 0
         }),
         width: widgetDims[0],
         height: widgetDims[1]
         };

         setPosition: function setPosition() {
         var config = this.view.widget.config,
         dims = this.dimensions,
         css = {
         left: App.base.define(config.left, dims.left),
         top: App.base.define(config.top, dims.top),
         width: App.base.define(config.width, dims.width),
         height: App.base.define(config.height, dims.height)
         };
         this.$.css(css);
         },
         */
        renderWidget: function renderWidget() {
            console.warn('fix dom', this.scope.dom);
            this.elements.$widget = new Widget(this, {
                id: this.createUUID(),
                style: [
                    this.createStyle(),
                    this.scope.config.type
                ].join(' '),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$widget);
            this.content();
            this.footer(Footer, this.elements.$widget);
        },

        content: function content() {
            this.elements.$content = new Content(this, {
                style: 'content',
                css: {
                    background: anthill.base.lib.generator.randomColor()
                },
                $container: this.elements.$widget.$
            });
        },

        render: function render() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered
            );
        },

        /**
         * Get widget.$
         * @returns {$|*|Element.$}
         */
        get$widget: function get$widget() {

            return this.elements.$widget.$;
        }

    }, BaseView.prototype)

});
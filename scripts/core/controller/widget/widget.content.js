/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/27/14
 * Time: 5:40 PM
 */

define([], function defineWidgetContent(){

    var WidgetContent = function WidgetContent() {

    };

    return WidgetContent.extend({

        /**
         * Load widget content
         */
        loadContent: function loadContent() {

            /**
             * Define $widget
             * @type {element.widget.widget.element}
             */
            var elements = this.view.elements;

            /**
             * Define resource url
             * @type {string}
             */
            var resource = elements.$widget.widgetPath +
                ('/' + this.resource).repeat(2) + '.js';

            require([resource], function getDependencies(Content){

                var content = new Content();

                elements.$content.$.html(content.getData());

            });

        }

    });

});
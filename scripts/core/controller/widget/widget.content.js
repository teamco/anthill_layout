/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/27/14
 * Time: 5:40 PM
 */

define([], function defineWidgetContent() {

    /**
     * Define WidgetContent
     * @class WidgetContent
     * @constructor
     */
    var WidgetContent = function WidgetContent() {
    };

    return WidgetContent.extend({

        /**
         * Load widget content
         */
        loadContent: function loadContent() {

            /**
             * Get resource
             * @type {*}
             */
            var resource = this.model.getConfig('resource');

            if (!anthill.base.isString(resource)) {
                this.logger.error('Unable to load resource');
                return false;
            }

            /**
             * Define $widget
             * @type {element.widget.widget.element}
             */
            var elements = this.view.elements;

            /**
             * Define resource path
             * @type {string}
             */
            var path = [
                '../../scripts/plugins/widgets' ,
                ('/' + resource).repeat(2),
                '.js'
            ].join('');

            require([path], function getDependencies(Content) {

                var content = new Content();

                elements.$content.$.html(content.getData());
            });
        }
    });
});
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
             * Define widget instance
             */
            var widget = this;

            /**
             * Get resource
             * @type {*}
             */
            var resource = widget.model.getConfig('preferences/resource');

            if (!anthill.base.isString(resource)) {
                widget.logger.error('Unable to load resource');
                return false;
            }

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

                widget.observer.publish(
                    widget.eventmanager.eventList.setContent,
                    Content
                );
            });
        },

        /**
         * Set content
         * @param {Function} Content
         */
        setContent: function setContent(Content) {

            /**
             * Define content
             * @type {Content}
             */
            var content = new Content(this);

            this.logger.debug('Set content', content);

            /**
             * Define content
             * @type {Content}
             */
            this.content = content;
        },

        /**
         * Get content
         * @returns {Content}
         */
        getContent: function getContent() {
            return this.scope.content;
        }
    });
});
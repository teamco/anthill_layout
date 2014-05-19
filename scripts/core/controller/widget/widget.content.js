/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/27/14
 * Time: 5:40 PM
 */

define([
    'config/anthill'
], function defineWidgetContent(AntHill) {

    /**
     * Define WidgetContent
     * @class WidgetContent
     * @extends AntHill
     * @constructor
     */
    var WidgetContent = function WidgetContent() {
    };

    return WidgetContent.extend('WidgetContent', {

        /**
         * Load widget content
         * @member WidgetContent
         */
        loadContent: function loadContent() {

            /**
             * Define widget instance
             * @type {*}
             */
            var widget = this;

            /**
             * Get resource
             * @type {*}
             */
            var resource = widget.model.getConfig('preferences/resource');

            if (!this.base.isString(resource)) {
                widget.logger.error('Unable to load resource');
                return false;
            }

            /**
             * Define resource path
             * @type {string}
             */
            var path = [
                '../../scripts/plugins/widgets' ,
                ('/' + resource).repeat(2)
            ].join('');

            require([path], function getDependencies(Content) {

                widget.observer.publish(
                    widget.eventmanager.eventList.setContent,
                    [Content, {
                        events: widget.contentEvents
                    }]
                );
            });
        },

        /**
         * Set content
         * @member WidgetContent
         * @param {Function} Content
         * @param {{}} [opts]
         */
        setContent: function setContent(Content, opts) {

            /**
             * Define content
             * @member WidgetContent
             * @type {Content}
             */
            this.content = new Content(this, opts);

            this.logger.debug('Set content', this.content, opts);
        },

        /**
         * Get content
         * @member WidgetContent
         * @returns {Content}
         */
        getContent: function getContent() {
            return this.scope.content;
        }

    }, AntHill.prototype);
});
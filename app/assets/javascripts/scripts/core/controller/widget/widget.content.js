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
         * Define load widget data
         * @member WidgetContent
         * @param {boolean} [force]
         */
        loadWidgetData: function loadWidgetData(force) {

            /**
             * Init force
             * @type {boolean}
             */
            force = this.base.defineBoolean(force, false, true);

            /**
             * Get local scope
             * @type {Widget}
             */
            var scope = this.scope;

            /**
             * Get widget page
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            /**
             * Get current page
             * @type {Page}
             */
            var page = workspace.controller.isLoadPageContent(force);

            if (page) {

                scope.observer.batchPublish(
                    scope.eventmanager.eventList.loadContent,
                    scope.eventmanager.eventList.loadPreferences
                );

                scope.logger.debug('Content start loading');
            }
        },

        /**
         * Load widget content
         * @member WidgetContent
         */
        loadContent: function loadContent() {

            /**
             * Define widget instance
             * @type {Widget}
             */
            var widget = this;

            /**
             * Get resource
             * @type {string}
             */
            var resource = widget.model.getConfig('preferences').resource;

            if (!this.base.isString(resource)) {
                widget.logger.error('Unable to load resource');
                return false;
            }

            /**
             * Define resource path
             * @type {string}
             */
            var path = [
                '../../scripts/plugins/widgets',
                ('/' + resource).repeat(2)
            ].join('');

            require([path], function getDependencies(Content) {

                widget.observer.publish(
                    widget.eventmanager.eventList.setContent,
                    [Content, {
                        events: widget.contentEvents || {},
                        rules: widget.contentRules || {}
                    }]
                );

                widget.logger.debug('Content finish loading');
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
             * @type {*}
             */
            this.content = new Content(this, opts);

            this.logger.debug('Set content', this.content, opts);
        },

        /**
         * Get content
         * @member WidgetContent
         * @returns {*}
         */
        getContent: function getContent() {
            return this.scope.content;
        },

        /**
         * Clear thumbnail bg
         * @member WidgetController
         */
        clearThumbnail: function clearThumbnail() {
            this.view.get$item().clearBackground();
        },

        /**
         * Adopt widget dimension on resize page
         * @member WidgetController
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(animate) {
            this.map.adoptTo(animate);
        },

        /**
         * Get widget thumbnail
         * @member WidgetController
         * @returns {*}
         */
        getThumbnail: function getThumbnail() {
            return this.model.getConfig('preferences').thumbnail;
        },

        /**
         * Get widget resource
         * @member WidgetController
         * @returns {*}
         */
        getResource: function getResource() {
            return this.model.getConfig('preferences').resource;
        }

    }, AntHill.prototype);
});
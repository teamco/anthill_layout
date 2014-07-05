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
                        events: widget.contentEvents || {},
                        rules: widget.contentRules || {}
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
             * @type {*}
             */
            this.content = new Content(this, opts);

            this.logger.debug('Set content', this.content, opts);

            this.observer.publish(
                this.eventmanager.eventList.loadPreferences
            );
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
         * Set widget layer up
         * @member WidgetController
         * @param {boolean} save
         */
        setLayerUp: function setLayerUp(save) {
            this.map.updateLayer(true, save);
        },

        /**
         * Set widget layer down
         * @member WidgetController
         * @param {boolean} save
         */
        setLayerDown: function setLayerDown(save) {
            this.map.updateLayer(false, save);
        },

        /**
         * Update layout z-index
         * @member WidgetController
         * @param index
         */
        updateLayerIndex: function updateLayerIndex(index) {

            /**
             * Define config html
             * @type {{}}
             */
            var configHtml = this.model.getConfig('html');

            configHtml.zIndex = index;
            this.mode.setConfig('html', configHtml);
        },

        /**
         * Restore layer index
         * @member WidgetController
         */
        restoreLayerIndex: function restoreLayerIndex() {

            /**
             * Get containment
             * @type {Page|*}
             */
            var containment = this.controller.getContainment();

            containment.controller.revertLayer();
        },

        /**
         * Set widget always on top
         * @member WidgetController
         * @param {boolean} ontop
         */
        setAlwaysOnTop: function setAlwaysOnTop(ontop) {

            this.view.get$item().moveOnTopLayer(ontop);

            /**
             * Get containment
             * @type {Page|*}
             */
            var containment = this.controller.getContainment();

            containment.controller.reorderLayers();
        },

        /**
         * Transfer click to content
         * @member WidgetController
         * @param {string} url
         */
        setOnClickUrl: function setOnClickUrl(url) {
            this.contentEvents['onClickOpenUrl'] = url;
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
            return this.model.getConfig('preferences/thumbnail');
        },

        /**
         * Get widget resource
         * @member WidgetController
         * @returns {*}
         */
        getResource: function getResource() {
            return this.model.getConfig('preferences/resource');
        }

    }, AntHill.prototype);
});
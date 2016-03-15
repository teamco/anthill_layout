/**
 * Created by teamco on 7/8/14.
 */

define(function defineWidgetLayer() {

    /**
     * Define WidgetLayer
     * @class WidgetLayer
     * @constructor
     */
    var WidgetLayer = function WidgetLayer() {
    };

    return WidgetLayer.extend('WidgetLayer', {

        /**
         * Set widget layer up
         * @memberOf WidgetLayer
         * @param {boolean} save
         */
        setLayerUp: function setLayerUp(save) {
            this.map.updateLayer(true, save);
        },

        /**
         * Set widget layer down
         * @memberOf WidgetLayer
         * @param {boolean} save
         */
        setLayerDown: function setLayerDown(save) {
            this.map.updateLayer(false, save);
        },

        /**
         * Update layout z-index
         * @memberOf WidgetLayer
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
         * @memberOf WidgetLayer
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
         * @memberOf WidgetLayer
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
        }
    });
});
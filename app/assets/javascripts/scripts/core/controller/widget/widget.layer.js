/**
 * Created by i061485 on 7/8/14.
 */

define([], function defineWidgetLayer() {

    var WidgetLayer = function WidgetLayer() {

    };

    return WidgetLayer.extend('WidgetLayer', {

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
        }
    });
});
/**
 * Created by teamco on 7/15/15.
 */

define(function defineWidgetGeneratorExternal() {

    /**
     * Define WidgetGeneratorExternal
     * @class WidgetGeneratorExternal
     * @extends SiteConfigWidgetGenerator
     * @extends WidgetGeneratorCore
     * @constructor
     */
    var WidgetGeneratorExternal = function WidgetGeneratorExternal() {
    };

    return WidgetGeneratorExternal.extend('WidgetGeneratorExternal', {

        /**
         * Define import external widget step
         * @memberOf WidgetGeneratorExternal
         */
        nextWidgetExternal: function nextWidgetExternal() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = panel.controller.getGallery();

            if (gallery) {
                this.scope.view.showWidgetExternal(
                    gallery.model.staticData.getDefaultData(),
                    gallery.model.dataTypes,
                    this.model.getConfig('widget')
                );
            }
        },

        /**
         * Generate external widget
         * @memberOf WidgetGeneratorExternal
         */
        generateExternalWidget: function generateExternalWidget() {

            /**
             * Get collector
             * @type {{
             *      category: string,
             *      collector: {},
             *      $modal: ModalElement,
             *      clone,
             *      validate: *,
             *      empty: number
             * }}
             */
            var data = this._collectFormWidgetData(true);

            /**
             * Get create new widget route
             * @type {Routes.resources.createExternalWidget|*}
             */
            var route = this.resources.createExternalWidget;

            $.ajax({

                url: route[0],
                method: route[1],

                data: this.prepareXhrData({
                    author_widget: data.collector,
                    author_widget_clone: data.clone,
                    author_widget_category: {
                        name_index: data.category
                    }
                }),

                beforeSend: this._beforeSendWidgetData.bind({
                    controller: this,
                    data: data
                }),

                error: this._onErrorSendWidgetData.bind({
                    controller: this,
                    data: data
                })

            }).done(
                this.generateNewWidgetCallback.bind(this)
            );
        }
    });
});
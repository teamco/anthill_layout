/**
 * Created by teamco on 7/15/15.
 */
define(function defineWidgetGeneratorForm() {

    /**
     * Define WidgetGeneratorForm
     * @class WidgetGeneratorForm
     * @extends SiteConfigWidgetGenerator
     * @constructor
     */
    var WidgetGeneratorForm = function WidgetGeneratorForm() {
    };

    return WidgetGeneratorForm.extend('WidgetGeneratorForm', {

        /**
         * Clear widget generate form
         * @memberOf WidgetGeneratorForm
         * @protected
         */
        _clearWidgetForm: function _clearWidgetForm() {

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = this.scope.view.get$modal();

            // Clear form
            $modal.collectInputFields({
                method: 'not',
                value: '[name="category"]'
            }).val('');

            // Clear image preview
            $modal.$.find('img').attr('src', '');
        },

        /**
         * Collect form widget's data
         * @memberOf WidgetGeneratorForm
         * @param {boolean} [external]
         * @returns {boolean|{
         *      category: string,
         *      collector: {},
         *      $modal: ModalElement,
         *      validate: *,
         *      empty: number
         * }}
         * @protected
         */
        _collectFormWidgetData: function _collectFormWidgetData(external) {

            // Convert to boolean
            external = !!external;

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.scope;

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = scope.view.get$modal();

            var inputs = $modal.collectInputFields(),
                validate = inputs.hasClass('validate'),
                empty = 0,
                i = 0, l = inputs.length,
                data;

            /**
             * Define collector
             * @type {{name: string, category: string, clone: string, scratch: string, visible: boolean}}
             */
            var collector = {
                clone: '',
                scratch: '',
                visible: true
            };

            for (; i < l; i++) {
                data = inputs[i];
                collector[data.name] = data.value;
                $(data).blur();
                if (data.value.length === 0) empty++;
            }

            if (collector['clone'].length === 0 && collector['scratch'] === 'true') {
                empty--;
            }

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = this.getGalleryModule(),
                clone, name;

            if (gallery) {

                // Store category key
                var category = this.base.lib.hash.getKeyByValue(
                    gallery.model.dataTypes,
                    collector.category
                );

                /**
                 * Get widget resource
                 * @type {string}
                 */
                var resource = scope.view.elements.$widgetgenerator.getResource();

                if (collector.clone.length > 0) {

                    resource = (gallery.model.staticData.getWidgetData(
                        'name', collector.clone
                    ) || {}).resource;
                }

                if (typeof(resource) === 'undefined' || resource.length === 0) {

                    scope.logger.warn('Undefined resource', collector);
                    return false;
                }

                /**
                 * Get clone data
                 * @type {{
                 *      name: string,
                 *      description: string,
                 *      thumbnail: string,
                 *      dimensions: {width: number, height: number},
                 *      type: string,
                 *      resource: string
                 * }}
                 */
                clone = gallery.model.staticData.getWidgetData(
                        'resource',
                        external ? 'external' : (collector.scratch === 'true' ? 'empty' : resource)
                    ) || {}
            }

            // Define hash
            var hash = {
                clone: clone.resource,
                category: category,
                collector: collector,
                $modal: $modal,
                validate: validate,
                empty: empty
            };

            // Remove none permitted attribute
            delete collector.category;
            delete collector.clone;
            delete collector.scratch;

            return hash;
        }
    });
});
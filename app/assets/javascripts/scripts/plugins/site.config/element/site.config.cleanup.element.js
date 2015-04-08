/**
 * Created by i061485 on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigCleanUpElement(BaseElement) {

    /**
     * Define SiteConfigCleanUpElement
     * @class SiteConfigCleanUpElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigCleanUpElement}
     */
    var SiteConfigCleanUpElement = function SiteConfigCleanUpElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.prettifyJSON();

        return this;
    };

    return SiteConfigCleanUpElement.extend('SiteConfigCleanUpElement', {

        /**
         * Prettify JSON
         * @memberOf SiteConfigCleanUpElement
         * @returns {XML|string}
         */
        prettifyJSON: function prettifyJSON() {

            /**
             * Load pretty print functionality
             * @private
             */
            function _loadPrettyPrint() {

                $(prettyPrint(data)).appendTo(this.$);
                this.adoptModalDialogPosition();
            }

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope,
                data = scope.controller.root().model.setting.load();

            if (window.prettyPrint) {

                // Load cached version
                _loadPrettyPrint.bind(this)();

            } else {

                require(
                    ['lib/packages/pretty.print'],
                    _loadPrettyPrint.bind(this)
                );
            }
        }

    }, BaseElement.prototype);
});
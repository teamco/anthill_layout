/**
 * Created by teamco on 7/31/14.
 */

define([
    'jquery',
    'modules/Element'
], function defineSiteConfigApproveImportElement($, BaseElement) {

    /**
     * Define SiteConfigApproveImportElement
     * @class SiteConfigApproveImportElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigApproveImportElement}
     */
    var SiteConfigApproveImportElement = function SiteConfigApproveImportElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define local data
         * @property SiteConfigApproveImportElement
         * @type {object}
         */
        this.data = opts.data;

        this.prettifyJSON(this.data);

        return this;
    };

    return SiteConfigApproveImportElement.extend('SiteConfigApproveImportElement', {

        /**
         * Prettify JSON
         * @memberOf SiteConfigCleanUpElement
         * @param {object} data
         * @returns {XML|string}
         */
        prettifyJSON: function prettifyJSON(data) {

            /**
             * Load pretty print functionality
             * @private
             */
            function _loadPrettyPrint() {

                $(prettyPrint(data)).appendTo(this.$);
                this.adoptModalDialogPosition();
            }

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
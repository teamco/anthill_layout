/**
 * Created by teamco on 7/31/14.
 */

define([
    'plugins/plugin.element'
], function defineSiteConfigCleanUpElement(PluginElement) {

    /**
     * Define SiteConfigCleanUpElement
     * @class SiteConfigCleanUpElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends PluginElement
     * @returns {SiteConfigCleanUpElement}
     */
    var SiteConfigCleanUpElement = function SiteConfigCleanUpElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container
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
             * @type {SiteConfig|AntHill}
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

    }, PluginElement.prototype);
});
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

        this._config(view, opts, $('<pre />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.prettifyJSON();

        return this;
    };

    return SiteConfigCleanUpElement.extend('SiteConfigCleanUpElement', {

        /**
         * Prettify JSON
         * @member SiteConfigCleanUpElement
         * @returns {XML|string}
         */
        prettifyJSON: function prettifyJSON() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope,
                data = scope.controller.root().model.setting.load();

            require(['lib/packages/pretty.print'], function loadPrettyPrint() {

                $(prettyPrint(data)).appendTo(this.$);
                this.adoptModalDialogPosition();

            }.bind(this));
        }

    }, BaseElement.prototype);
});
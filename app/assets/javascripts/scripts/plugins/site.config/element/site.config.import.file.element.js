/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'modules/File.API'
], function defineSiteConfigImportFileElement(BaseElement, FileAPI) {

    /**
     * Define SiteConfigImportFileElement Element
     * @constructor
     * @class SiteConfigImportFileElement
     * @extends BaseElement
     * @extends FileAPI
     * @extends Renderer
     * @param {SiteConfigView} view
     * @param opts
     * @returns {SiteConfigImportFileElement}
     */
    var SiteConfigImportFileElement = function SiteConfigImportFileElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.init();
    };

    return SiteConfigImportFileElement.extend('SiteConfigImportFileElement', {

        /**
         * Define init
         * @member SiteConfigImportFileElement
         * @returns {SiteConfigImportFileElement}
         */
        init: function init() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            this.renderJSONUploader({
                eventName: scope.eventmanager.eventList.approveImportSiteData,
                info: true
            });

            return this;
        }

    }, BaseElement.prototype, FileAPI.prototype);

});
/**
 * Created by teamco on 8/18/14.
 */

define([], function defineFileApi() {

    /**
     * Define File API
     * @class FileAPI
     * @constructor
     */
    var FileAPI = function FileAPI() {

    };

    return FileAPI.extend('FileAPI', {

        /**
         * Check File API
         * @member SiteConfigImportFileElement
         * @returns {boolean}
         */
        checkFileApi: function checkFileApi() {

            // Get scope
            var scope = this.view.scope;

            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                scope.logger.debug('Great success! All the File APIs are supported');
                return true;
            } else {
                scope.logger.warn('The File APIs are not fully supported in this browser');
                return false;
            }
        }
    });
});
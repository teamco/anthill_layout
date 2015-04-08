/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define([], function defineLibFile() {

    /**
     * Define LibFile
     * @class LibFile
     * @constructor
     */
    var LibFile = function LibFile() {
    };

    LibFile.extend('LibFile', {

        /**
         * Check API
         * @member LibFile
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
        },

        /**
         * Create Blob URL
         * @member LibFile
         * @param {string} content
         * @param {string} type
         * @param {string} fname
         * @returns {string}
         */
        createURL: function createURL(content, type, fname) {

            /**
             * Define blob instance
             * @type {Blob}
             */
            var blob = this._base64toBlob(
                content,
                type
            );

            return (navigator.appVersion.toString().indexOf('.NET') > 0) ?
                window.navigator.msSaveOrOpenBlob(blob, fname) :
                window.URL.createObjectURL(blob);
        },

        /**
         * Define convert base64 to blob
         * @member LibFile
         * @param {string} base64Data
         * @param {string} contentType
         * @returns {*}
         * @private
         */
        _base64toBlob: function _base64toBlob(base64Data, contentType) {

            contentType = contentType || '';

            var sliceSize = 1024,
                byteCharacters = decodeURIComponent(atob(base64Data)),
                bytesLength = byteCharacters.length,
                slicesCount = Math.ceil(bytesLength / sliceSize),
                byteArrays = new Array(slicesCount),
                sliceIndex = 0,
                blob;

            for (; sliceIndex < slicesCount; ++sliceIndex) {

                var begin = sliceIndex * sliceSize,
                    end = Math.min(begin + sliceSize, bytesLength),
                    bytes = new Array(end - begin);

                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }

                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }

            try {

                /**
                 * Define blob
                 * @type {Blob}
                 */
                blob = new Blob(byteArrays, {type: contentType});

            } catch (e) {

                // TypeError old chrome and FF
                window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;

                if (e.name == 'TypeError' && window.BlobBuilder) {

                    /**
                     * Define blob builder
                     * @type {BlobBuilder}
                     */
                    var bb = new BlobBuilder();

                    bb.append(byteArrays);
                    blob = bb.getBlob(contentType);

                } else if (e.name == "InvalidStateError") {

                    // InvalidStateError (tested on FF13 WinXP)
                    blob = new Blob(byteArrays, {type: contentType});

                } else {

                    // We're screwed, blob constructor unsupported entirely
                }
            }

            return blob;
        }
    });

    return new LibFile();
});
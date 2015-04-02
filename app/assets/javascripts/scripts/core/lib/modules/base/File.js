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
         * Create Blob URL
         * @member LibFile
         * @param {{content: string, type: string}} data
         * @returns {*}
         */
        createURL: function createURL(data) {

            return window.URL.createObjectURL(
                this._base64toBlob(
                    data.content,
                    data.type
                )
            )
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
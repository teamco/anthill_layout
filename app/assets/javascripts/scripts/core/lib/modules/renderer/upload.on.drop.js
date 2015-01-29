/**
 * Created by teamco on 8/18/14.
 */

define(['jquery'], function defineUploadOnDrop($) {

    /**
     * Define upload on drop
     * @class UploadOnDropRenderer
     * @constructor
     */
    var UploadOnDropRenderer = function UploadOnDropRenderer() {

    };

    return UploadOnDropRenderer.extend('UploadOnDropRenderer', {

        /**
         * Render JSON uploader
         * @member UploadOnDropRenderer
         * @param opts
         */
        renderJSONUploader: function renderJSONUploader(opts) {

            if (this.checkFileApi()) {

                var scope = this.view.scope,
                    cname = scope.constructor.prototype.name.toDash(),
                    $dropZone = $('<div class="' + cname + '-drop-zone" />').
                        text('Drop JSON here'),
                    $output = $('<ul class="' + cname + '-file-info"></ul>');

                this.$.append([
                    $dropZone,
                    $output
                ]);

                /**
                 * Handle file select
                 * @param {{dataTransfer}} evt
                 * @private
                 */
                function _handleFileSelect(evt) {

                    evt.stopPropagation();
                    evt.preventDefault();

                    /**
                     * FileList object
                     * @type {FileList}
                     */
                    var files = evt.dataTransfer.files,
                        file = files[0];

                    /**
                     * Define reader
                     * @type {FileReader}
                     */
                    var reader = new FileReader();

                    /**
                     * If we use onloadend, we need to check the readyState.
                     * @param evt
                     */
                    reader.onloadend = function (evt) {

                        // DONE == 2
                        if (evt.target.readyState === FileReader.DONE) {

                            /**
                             * Get file content
                             * @type {string}
                             */
                            var content = evt.target.result;

                            try {

                                // Remove back slashes from json
                                // http://json.parser.online.fr/beta/
                                content = content.replace(/\\"/g, '"').
                                    replace(/\\"/g, '"').
                                    replace(/"/, '').
                                    replace(/"$/, "");

                                scope.observer.publish(
                                    opts.eventName,
                                    [JSON.parse(content), file]
                                );

                                scope.logger.debug(content);

                            } catch (e) {

                                scope.logger.error('Unable to parse JSON', e, content);
                                $dropZone.addClass('error').
                                    text('Unable to parse JSON');
                            }
                        }
                    };

                    reader.readAsBinaryString(
                        file.slice(0, file.size - 1)
                    );

                    if (opts.info) {

                        // List some properties
                        var info = [
                            '<li><strong>', encodeURIComponent(file.name), '</strong> (',
                            file.type || 'n/a', ') - ',
                            this.view.scope.base.lib.number.bytes2Size(file.size), '</li>',
                            '<li> Last modified: ',
                            file.lastModifiedDate ?
                                file.lastModifiedDate.toLocaleDateString() : 'n/a',
                            '</li>'
                        ];

                        $output.html(info.join(''));
                    }
                }

                /**
                 * Define handle Drag/Over
                 * @param evt
                 * @private
                 */
                function _handleDragOver(evt) {

                    evt.stopPropagation();
                    evt.preventDefault();

                    // Explicitly show this is a copy.
                    evt.dataTransfer.dropEffect = 'copy';
                }

                // Setup the dnd listeners.
                $dropZone[0].addEventListener('dragover', _handleDragOver, false);
                $dropZone[0].addEventListener('drop', _handleFileSelect.bind(this), false);
            }
        }
    });
});
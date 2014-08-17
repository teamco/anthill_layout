/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteConfigImportFileElement(BaseElement) {

    /**
     * Define SiteConfigImportFileElement Element
     * @constructor
     * @class SiteConfigImportFileElement
     * @extends BaseElement
     * @param view
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

            if (this.checkFileApi()) {

                var $dropZone = $('<div class="site-config-drop-zone" />').text('Drop JSON here'),
                    $output = $('<output class="site-config-file-info"></output>');

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

                    // FileList object
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
                                content = content.replace(/\\/g, "").
                                    replace(/"/, '');

                                scope.observer.publish(
                                    scope.eventmanager.eventList.approveImportSiteData,
                                    JSON.parse(content)
                                );

                                scope.logger.debug(content);

                            } catch (e) {

                                scope.logger.error('Unable to parse JSON', e, content);
                            }
                        }
                    };

                    reader.readAsBinaryString(
                        file.slice(0, file.size - 1)
                    );

                    // List some properties
                    var output = [
                        '<li><strong>', encodeURIComponent(file.name), '</strong> (',
                        file.type || 'n/a', ') - ',
                        file.size, ' bytes<br /> Last modified: ',
                        file.lastModifiedDate ?
                            file.lastModifiedDate.toLocaleDateString() : 'n/a',
                        '</li>'
                    ];

                    $output.html('<ul>' + output.join('') + '</ul>');
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
                $dropZone[0].addEventListener('drop', _handleFileSelect, false);
            }

            return this;
        },

        /**
         * Check File API
         * @member SiteConfigImportFileElement
         * @returns {boolean}
         */
        checkFileApi: function checkFileApi() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
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

    }, BaseElement.prototype);

});
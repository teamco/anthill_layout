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

            if (this.checkFileApi()) {

                var $dropZone = $('<div class="site-config-drop-zone" />').text('Drop JSON here'),
                    $output = $('<output class="site-config-file-info"></output>');

                this.$.append([
                    $dropZone,
                    $output
                ]);

                function handleFileSelect(evt) {

                    evt.stopPropagation();
                    evt.preventDefault();

                    // FileList object
                    var files = evt.dataTransfer.files;

                    // files is a FileList of File objects. List some properties
                    var output = [];

                    for (var i = 0, f; f = files[i]; i++) {

                        /**
                         * Define reader
                         * @type {FileReader}
                         */
                        var reader = new FileReader();

                        // Closure to capture the file information.
                        reader.onload = (function(theFile) {
                            return function(e) {debugger
                                return e.target.result;
                            };
                        })(f);

                        debugger

                        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                            f.size, ' bytes, last modified: ',
                            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                            '</li>');
                    }

                    $output.html('<ul>' + output.join('') + '</ul>');
                }

                function handleDragOver(evt) {

                    evt.stopPropagation();
                    evt.preventDefault();

                    // Explicitly show this is a copy.
                    evt.dataTransfer.dropEffect = 'copy';
                }

                // Setup the dnd listeners.
                $dropZone[0].addEventListener('dragover', handleDragOver, false);
                $dropZone[0].addEventListener('drop', handleFileSelect, false);
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
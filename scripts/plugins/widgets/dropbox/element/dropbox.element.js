/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineDropboxElement(BaseElement) {

    /**
     * Define Dropbox Element
     * @param view
     * @param opts
     * @returns {DropboxElement}
     * @constructor
     * @class DropboxElement
     * @extends BaseElement
     */
    var DropboxElement = function DropboxElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('dropbox', {resource: '/widgets'});

        /**
         * Download
         * @member DropboxElement
         * @type {string}
         */
        this.download = 'Download';

        return this;
    };

    return DropboxElement.extend('DropboxElement', {

        /**
         * Render Embedded content
         * @member DropboxElement
         * @param {{url: string|*, download: boolean}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            if (opts.url) {

                this.empty();

                if (opts.download) {

                    this.$.append(
                        $('<a />').attr({
                            href: opts.url,
                            title: opts.name || this.download
                        }).text(opts.name || this.download)
                    );
                }

                return this;
            }

            if (!window.Dropbox) {
                return false;
            }

            /**
             * Define dropbox element
             * @type {DropboxElement}
             */
            var $element = this;

            require([
                'https://www.dropbox.com/static/api/2/dropins.js'
            ], function getDropboxApi() {

                /**
                 * Define dropbox button instance
                 */
                var $button = Dropbox.createChooseButton({

                    success: function(data) {

                        /**
                         * Get response data
                         * @type {{bytes, icon, link, name, thumbnailLink}}
                         */
                        var hash = data[0];

                        $element.view.controller.setHiddenPreferences('dropboxBytes', hash.bytes);
                        $element.view.controller.setHiddenPreferences('dropboxIcon', hash.icon);
                        $element.view.controller.setHiddenPreferences('dropboxUrl', hash.link);
                        $element.view.controller.setHiddenPreferences('dropboxFileName', hash.name);
                        $element.view.controller.setHiddenPreferences('dropboxThumbnail', hash.thumbnailLink);

                        /**
                         * Get scope
                         * @type {Dropbox}
                         */
                        var scope = $element.view.scope;

                        scope.observer.publish(
                            scope.eventmanager.eventList.setEmbeddedContent
                        );
                    },
                    linkType: 'direct'
                });

                $element.$.append($button);
            });

        }

    }, BaseElement.prototype);

});
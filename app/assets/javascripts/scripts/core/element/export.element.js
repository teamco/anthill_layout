/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'modules/Element'
], function defineExportElement($, BaseElement) {

    /**
     * Define Application export element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class ExportElement
     * @extends BaseElement
     */
    var ExportElement = function ExportElement(view, opts) {

        this._config(view, opts, $('<a />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.init(opts.data || {});
    };

    return ExportElement.extend('ExportElement', {

        /**
         * Init export element
         * @memberOf ExportElement
         * @param {{
         *      type: string,
         *      [fileName]: string,
         *      [title]: string,
         *      content,
         *      [autoload]: boolean
         * }} data
         * @returns {ExportElement}
         */
        init: function init(data) {

            /**
             * Define scope
             * @type {Application}
             */
            var scope = this.view.scope,
                lib = scope.base.lib,
                fname = data.fileName || 'file.txt';

            /**
             * Define url
             * @type {string}
             */
            var url;

            try {

                url = lib.file.createURL(
                    scope.base.isBase64(data.content) ?
                        data.content :
                        lib.string.utf8ToBase64(data.content),
                    data.type,
                    fname
                );

                scope.logger.debug('Blob URL', url);

            } catch (e) {

                scope.logger.warn('Unable to create Blob URL', e);

                /**
                 * Define content
                 * @type {string}
                 */
                var content = lib.string.base64.encode(
                    data.content
                );

                if (content.length <= 50000) {

                    try {

                        url = [
                            'data:', data.type,
                            ';charset=utf-8;base64,', content
                        ].join('');

                        scope.logger.debug('Data-URI URL', url);

                    } catch (e) {

                        scope.logger.warn('Unable to create URL', e);
                    }

                } else {

                    scope.logger.warn('URL too long');
                }
            }

            if (url) {

                this.$.attr({

                    href: url,
                    download: fname,
                    title: data.title || 'Download'

                }).text(data.title || 'Download');

                if (data.autoload) {

                    lib.event.simulate(this.$[0], 'click');
                }
            }

            return this;
        }

    }, BaseElement.prototype);
});
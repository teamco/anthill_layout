/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineAppContent(BaseElement) {

    /**
     * Define App export element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class AppContent
     * @extends BaseElement
     */
    var AppExportElement = function AppExportElement(view, opts) {

        this._config(view, opts, $('<a />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this.init(opts.data || {});
    };

    return AppExportElement.extend('AppExportElement', {

        /**
         * Init export element
         * @param {{type: string, [fileName]: string, [title]: string, [autoload]: boolean}} data
         * @returns {AppExportElement}
         */
        init: function init(data) {

            /**
             * Define url
             * @type {string}
             */
            var url = [
                data.type,
                encodeURIComponent(
                    JSON.stringify(data.json)
                )
            ].join(',');

            this.$.attr({

                href: 'data: ' + url,
                download: data.fileName || 'file.txt',
                title: data.title || 'Download'

            }).text(data.title || 'Download');

            if (data.autoload) {
                this.$[0].click();
            }

            return this;
        }

    }, BaseElement.prototype);
});
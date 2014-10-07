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
     * Define App export element
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
         * @member ExportElement
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

            try {

                /**
                 * Define url
                 * @type {string}
                 */
                var url = [
                    'data:',
                    data.type,
                    ';charset=utf-8;base64,',
                    this.view.scope.base.lib.string.base64.encode(data.content)
                ].join('');

            } catch (e) {


            }

            this.$.attr({

                href: url,
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
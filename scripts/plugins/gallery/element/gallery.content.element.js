/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineGalleryContentElement(BaseElement) {

    /**
     * Define Gallery Content Element
     * @param view
     * @param opts
     * @returns {GalleryContentElement}
     * @constructor
     * @class GalleryContentElement
     * @extends BaseElement
     */
    var GalleryContentElement = function GalleryContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.bindInstallWidget();

        return this;
    };

    return GalleryContentElement.extend('GalleryContentElement', {

        /**
         * Set attributes
         * @memberOf GalleryContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            this.$.attr({
                title: data.name,
                rel: data.description,
                resource: data.resource
            });

            this.$.css({
                backgroundImage: 'url("' + data.thumbnail + '")'
            });
        },

        /**
         * Bind Install widget
         * @memberOf GalleryContentElement
         */
        bindInstallWidget: function bindInstallWidget() {

            /**
             * Click to install
             * @private
             */
            function _clickInstall() {
                this.view.controller.addWidget(this);
            }

            this.$.on(
                'click.install',
                _clickInstall.bind(this)
            );
        }

    }, BaseElement.prototype);

});
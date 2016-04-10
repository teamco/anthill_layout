/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGalleryContentElement(PluginElement) {

    /**
     * Define Gallery Content Element
     * @param view
     * @param opts
     * @returns {GalleryContentElement}
     * @constructor
     * @class GalleryContentElement
     * @extends PluginElement
     * @extends Renderer
     */
    var GalleryContentElement = function GalleryContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });

        /**
         * Define data
         * @property GalleryContentElement
         * @type {{
         *      name: string,
         *      resource: string,
         *      description: string,
         *      is_external: boolean,
         *      external_resource: string
         * }}
         */
        this.data = opts.data;

        this.getTemplate();
        this.setAttributes();
        this.bindInstallWidget();
        this.bindShowInfo();

        return this;
    };

    return GalleryContentElement.extend('GalleryContentElement', {

        /**
         * Define inner content
         * @memberOf GalleryContentElement
         */
        getTemplate: function getTemplate() {
            $('<a class="widget ' + this.data.resource.toClassName() + '" />').
                appendTo(this.$);
        },

        /**
         * Set attributes
         * @memberOf GalleryContentElement
         */
        setAttributes: function setAttributes() {

            this.$.attr({
                title: this.data.name,
                resource: this.data.resource
            });

            if (this.data.is_external) {

                $('a', this.$).attr({
                    style: 'background-image: url("' + this.fetchExternalResourceThumbnail(this.data) + '");'
                });

            } else {

                this.$.addClass(
                    this.view.controller.getResourceClassName(
                        this.data.resource
                    )
                );
            }
        },

        /**
         * Bind Install widget
         * @memberOf GalleryContentElement
         */
        bindInstallWidget: function bindInstallWidget() {

            /**
             * Click to install
             * @param {Event} event
             * @private
             */
            function _clickInstall(event) {
                event.preventDefault();
                this.view.controller.addWidget(this);
            }

            this.$.on(
                'click.install',
                _clickInstall.bind(this)
            );
        },

        /**
         * Show item info
         * @memberOf GalleryContentElement
         */
        bindShowInfo: function bindShowInfo() {

            /**
             * Define content element
             * @type {GalleryContentElement|string}
             */
            var element = this,
                external = element.data.is_external ? 'External' : 'Core';

            element.renderTooltip({
                title: element.data.name,
                description: element.data.description + '\n' + '(' + external + ')',
                selector: element.$
            });
        }

    }, PluginElement.prototype);
});
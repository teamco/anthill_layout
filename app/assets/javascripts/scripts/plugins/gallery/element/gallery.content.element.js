/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineGalleryContentElement(BaseElement) {

    /**
     * Define Gallery Content Element
     * @param view
     * @param opts
     * @returns {GalleryContentElement}
     * @constructor
     * @class GalleryContentElement
     * @extends BaseElement
     * @extends Renderer
     */
    var GalleryContentElement = function GalleryContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define data
         * @property GalleryContentElement
         * @type {{
         *      name: string,
         *      resource: string,
         *      description: string,
         *      is_external: boolean
         * }}
         */
        this.data = opts.data;

        this.addInnerContent();
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
        addInnerContent: function addInnerContent() {
            this.$.append('<div />');
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

            if (!this.data.is_external) {

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
             * @private
             */
            function _clickInstall() {
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
             * @type {GalleryContentElement}
             */
            var $content = this,
                external = $content.data.is_external ? 'External' : 'Core';

            $content.renderTooltip({
                title: $content.data.name,
                description: $content.data.description + '\n' + '(' + external + ')',
                $container: $content
            });
        }

    }, BaseElement.prototype);

});
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
     */
    var GalleryContentElement = function GalleryContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define data
         * @type {*}
         */
        this.data = opts.data;

        this.setAttributes();
        this.bindInstallWidget();
        this.bindShowInfo();

        return this;
    };

    return GalleryContentElement.extend('GalleryContentElement', {

        /**
         * Set attributes
         * @memberOf GalleryContentElement
         */
        setAttributes: function setAttributes() {

            this.$.attr({
                title: this.data.name,
                resource: this.data.resource
            });


            if (this.data.thumbnail.length > 0) {

                this.$.css({
                    backgroundImage: 'url("' + this.data.thumbnail + '")'
                });

            } else {

                this.$.addClass(
                    this.data.resource.replace(/\./g, '')
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

        bindShowInfo: function bindShowInfo() {

            /**
             * Define content element
             * @type {GalleryContentElement}
             */
            var $content = this;

            var $tooltip = $content.renderTooltip(
                $content.data.name,
                $content.data.description
            );

            $content.$.hover(

                function on() {

                    $content.$.append(
                        $tooltip.stop().fadeIn()
                    ).attr({
                            title: ''
                        });

                    $content.$.on('mousemove.gallery', function(e){
                        $tooltip.offset({
                            top: e.pageY - $tooltip.height() - 30,
                            left: e.pageX - 100
                        });
                    });
                },

                function off() {
                    $tooltip.remove();
                    $content.$.off('mousemove.gallery').attr({
                        title: $content.data.name
                    });
                }
            );
        }

    }, BaseElement.prototype);

});
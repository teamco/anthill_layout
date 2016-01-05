/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineQrCodeElement(BaseElement) {

    /**
     * Define QrCode Element
     * @param view
     * @param opts
     * @returns {QrCodeElement}
     * @constructor
     * @class QrCodeElement
     * @extends BaseElement
     */
    var QrCodeElement = function QrCodeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('qr.code', {resource: '/widgets'});

        return this;
    };

    return QrCodeElement.extend('QrCodeElement', {

        /**
         * Render Embedded content
         * @memberOf QrCodeElement
         */
        renderEmbeddedContent: function renderEmbeddedContent(text, size) {

            if (_.isUndefined(text) || _.isUndefined(size)) {

                this.view.scope.logger.debug('Initial loading', arguments);
                return false;
            }

            require([
                'lib/packages/raphael-min',
                'plugins/widgets/qr.code/lib/qrcodesvg'
            ], function requireQCode() {

                /**
                 * Init QrCode
                 * @type {Qrcodesvg}
                 */
                var qrcodesvg = new Qrcodesvg(text, this.id, size);

                qrcodesvg.draw();

                this.view.controller.clearParentThumbnail();

            }.bind(this));
        }

    }, BaseElement.prototype);
});

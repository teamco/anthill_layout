/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePixivElement(BaseElement) {

    /**
     * Define Pixiv Element
     * @param view
     * @param opts
     * @returns {PixivElement}
     * @constructor
     * @class PixivElement
     * @extends BaseElement
     */
    var PixivElement = function PixivElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pixiv', {resource: '/widgets'});

        /**
         * Define embed
         * @member PixivElement
         * @type {*}
         */
        this.embed = opts.embed;

        return this;
    };

    return PixivElement.extend('PixivElement', {

        /**
         * Render Embedded content
         * @member PixivElement
         * @param {string} script
         */
        renderEmbeddedContent: function renderEmbeddedContent(script) {

            // Export data
            var data = {
                'data-id': script.getAttribute('data-id'),
                'data-size': script.getAttribute('data-size'),
                'data-border': script.getAttribute('data-border'),
                'done': script.getAttribute('data-done')
            };

            // data-size="small|medium|large"
            // data-border="on|off"
            this.$.append(
                $('<div />').attr(data).addClass('pixiv-embed')
            );

            // Update requirejs config
            this.base.lib.rpatch.update({
                config: {
                    pixiv: {
                        'src': script.src,
                        'done': data.done,
                        'data-id': data['data-id'],
                        'data-size': data['data-size'],
                        'data-border': data['data-border']
                    }
                }
            });
        }

    }, BaseElement.prototype);
});

define(['module'], function (module){
   debugger
});

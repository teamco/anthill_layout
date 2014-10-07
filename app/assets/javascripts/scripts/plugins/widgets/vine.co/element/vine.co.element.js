/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineVineCoElement(BaseElement) {

    /**
     * Define VineCo Element
     * @param view
     * @param opts
     * @returns {VineCoElement}
     * @constructor
     * @class VineCoElement
     * @extends BaseElement
     */
    var VineCoElement = function VineCoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('vine.co', {resource: '/widgets'});

        return this;
    };

    return VineCoElement.extend('VineCoElement', {

        /**
         * Render Embedded content
         * @member VineCoElement
         * @param {{
         *      api: string,
         *      link: string,
         *      postcard: string,
         *      audio: boolean,
         *      video: boolean
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            /**
             * Define $element
             * @type {VineCoElement}
             */
            var $element = this;

            var audio = opts.audio ? 'audio=1' : '',
                video = opts.video ? '' : 'related=0';

            var params = [];

            if (audio.length > 0) {
                params.push(audio);
            }

            if (video.length > 0) {
                params.push(video);
            }

            if (!opts.link) {
                return false;
            }

            require([opts.api], function defineVineCo() {
                $element.$.append(
                    $('<iframe />').attr({
                        src: [
                            opts.link, '/embed/',
                            opts.postcard.toLowerCase(),
                                params.length > 0 ? ('?' + params.join('&')) : ''
                        ].join(''),
                        frameborder: 0,
                        scrolling: 'no'
                    }).addClass('vine-embed')
                );
            });
        }

    }, BaseElement.prototype);

});

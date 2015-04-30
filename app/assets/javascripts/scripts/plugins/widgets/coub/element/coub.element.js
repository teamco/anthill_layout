/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'jquery',
    'modules/Element'
], function defineCoubElement($, BaseElement) {

    /**
     * Define Coub Element
     * @param view
     * @param opts
     * @returns {CoubElement}
     * @constructor
     * @class CoubElement
     * @extends BaseElement
     */
    var CoubElement = function CoubElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('coub', {resource: '/widgets'});

        return this;
    };

    return CoubElement.extend('CoubElement', {

        /**
         * Render Embedded content
         * @memberOf CoubElement
         * @param {{
         *      link: string,
         *      start: boolean,
         *      mute: boolean,
         *      hide: boolean,
         *      hd: boolean
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            if (!opts.link) {
                return false;
            }

            var link = [
                opts.link, '?', [
                    'muted=' + !!opts.mute,
                    'autostart=' + !!opts.start,
                    'originalSize=' + false,
                    'hideTopBar=' + !!opts.hide,
                    'startWithHD=' + !!opts.hd
                ].join('&')
            ].join('');

            this.$.append(
                $('<iframe />').attr({
                    src: link,
                    frameborder: 0,
                    scrolling: "no"
                })
            );
        }

    }, BaseElement.prototype);

});

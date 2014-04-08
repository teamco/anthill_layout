/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineTwitsElement(BaseElement) {

    /**
     * Define Twits Element
     * @param view
     * @param opts
     * @returns {TwitsElement}
     * @constructor
     * @class TwitsElement
     * @extends BaseElement
     */
    var TwitsElement = function TwitsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('twits', {resource: '/widgets'});

        return this;
    };

    return TwitsElement.extend('TwitsElement', {

        /**
         * Render Embedded content
         * @member TwitsElement
         * @param {{
         *      twitterWidgetId: string,
         *      [twitsNumber]: number,
         *      [showHashTagsAsLinks]: boolean,
         *      [showPhoto]: boolean,
         *      [showTime]: boolean
         * }} opts
         * @returns {boolean|*}
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            if (!opts.twitterWidgetId) {
                return false;
            }

            /**
             * Define uuid
             * @type {String}
             */
            var uuid = [
                this.base.lib.generator.UUID(),
                'twits-content'
            ].join('-');

            /**
             * Define embedded template
             * @type {string}
             */
            var $post = $('<div />').attr({
                id: uuid
            });

            this.$.append($post);

            require([
                'plugins/widgets/twits/lib/twitter.post.fetcher'
            ], function renderTwits() {
                twitterFetcher.fetch(
                    opts.twitterWidgetId,
                    uuid,
                    opts.twitsNumber,
                    opts.showHashTagsAsLinks,
                    opts.showPhoto,
                    opts.showTime
                );
            });
        }

    }, BaseElement.prototype);

});
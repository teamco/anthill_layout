/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineFlickrFeedsElement(BaseElement) {

    /**
     * Define FlickrFeeds Element
     * @param view
     * @param opts
     * @returns {FlickrFeedsElement}
     * @constructor
     * @class FlickrFeedsElement
     * @extends BaseElement
     */
    var FlickrFeedsElement = function FlickrFeedsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('flickr.feeds', {resource: '/widgets'});

        return this;
    };

    return FlickrFeedsElement.extend('FlickrFeedsElement', {

        /**
         * Render Embedded content
         * @memberOf FlickrFeedsElement
         * @param item
         * @param {{[tags], [user_id]}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(item, opts) {

            /**
             * Get scope
             * @type {FlickrFeeds}
             */
            var scope = this.view.scope,
                $element = this.$;

            if (typeof(item) === 'undefined') {

                scope.logger.debug('Initial content');
                return false;
            }

            var query = {
                tagmode: 'any',
                format: 'json'
            };

            if (item.query) {

                if (opts.tags) {
                    query.tags = opts.tags;
                }

                if (opts.user_id) {
                    query[item.query] = opts.user_id;
                }
            }

            $.getJSON(item.url, query).done(
                function jsonpCallback(data) {

                    $.each(data.items, function each(i, item) {

                        $('<img>').attr({
                            src: item.media.m,
                            alt: item.title
                        }).appendTo(
                            $('<a />').attr({
                                href: item.link,
                                target: '_blank'
                            }).appendTo($element)
                        );

                        if (i === opts.max_length) {
                            return false;
                        }
                    });
                }
            );
        }

    }, BaseElement.prototype);

});

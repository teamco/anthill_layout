/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineVideoPayNetElement(BaseElement) {

    /**
     * Define VideoPayNet Element
     * @param view
     * @param opts
     * @returns {VideoPayNetElement}
     * @constructor
     * @class VideoPayNetElement
     * @extends BaseElement
     */
    var VideoPayNetElement = function VideoPayNetElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('video.pay.net', {resource: '/widgets'});

        return this;
    };

    return VideoPayNetElement.extend('VideoPayNetElement', {

        /**
         * Render Embedded content
         * @member VideoPayNetElement
         * @param {Array} data
         */
        renderEmbeddedContent: function renderEmbeddedContent(data) {

            /**
             * Get $element
             * @type {VideoPayNetElement}
             */
            var $element = this,
                count = 0;

            require(
                [
                    'jquery.timeago',
                    'plugins/widgets/video.pay.net/lib/jquery.video.pay.net.min'
                ],
                function loadStream() {

                    $element.$.video-pay-net({
                        limit: 400,
                        list: data,
                        feedloaded: function feedloaded() {

                            count++;

                            // Check if all the feeds have been loaded
                            if (count === data.length + 1) {

                                $('li', $element.$).each(function eachFeed() {

                                    var element = $(this),
                                        date = new Date(element.data('time'));

                                    element.append([
                                        '<abbr class="timeago" title="',
                                        date.toISO8601(date), '">', date, '</abbr>'
                                    ].join(''));
                                });
                                $('.timeago', $element.$).timeago();
                            }
                        }
                    });
                }
            );
        }

    }, BaseElement.prototype);

});

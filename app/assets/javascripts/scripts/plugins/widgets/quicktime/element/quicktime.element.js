/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineQuicktimeElement(BaseElement) {

    /**
     * Define Quicktime Element
     * @param view
     * @param opts
     * @returns {QuicktimeElement}
     * @constructor
     * @class QuicktimeElement
     * @extends BaseElement
     */
    var QuicktimeElement = function QuicktimeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('quicktime', {resource: '/widgets'});

        return this;
    };

    return QuicktimeElement.extend('QuicktimeElement', {

        /**
         * Render Embedded content
         * @member QuicktimeElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {

            /**
             * Define scope
             * @type {QuicktimeElement}
             */
            var scope = this;

            scope.$.append(
                $('<div />').text(url).hide()
            );

            require([

                'plugins/widgets/quicktime/lib/jquery.quicktime'

            ], function defineQuicktime() {

                $('div', scope.$).quicktime(
                    null,
                    { version: 7, update: false },
                    function (htmlOptions) {
                        $this = $(this);
                        htmlOptions.src = $this.text();
                        $this.before($.fn.quicktime.transform(htmlOptions));
                    }
                );
            });
        }

    }, BaseElement.prototype);

});
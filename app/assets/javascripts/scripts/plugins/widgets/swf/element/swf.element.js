/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSwfElement(BaseElement) {

    /**
     * Define Swf Element
     * @param view
     * @param opts
     * @returns {SwfElement}
     * @constructor
     * @class SwfElement
     * @extends BaseElement
     */
    var SwfElement = function SwfElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('swf', {resource: '/widgets'});

        return this;
    };

    return SwfElement.extend('SwfElement', {

        /**
         * Render Embedded content
         * @member SwfElement
         * @param {{}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            if (typeof (url) !== 'string' || (url && !(url + '').match(/\.swf/))) {
                return false;
            }

            // clear html content
            this.$.empty();

            /**
             * Define flash player container
             * @type {*|jQuery}
             */
            var $flash = $('<div class="flash-player" />').attr({
                id: this.view.renderUUID()
            });

            this.$.append($flash);

            require([
                'plugins/widgets/swf/lib/swfobject'
            ], function defineSwfObject(){

                swfobject.embedSWF(
                    url,
                    $flash[0],
                    "100%",
                    "100%",
                    10,
                    "expressInstall.swf",
                    JSON.parse(opts.flashvars || '{}'),
                    JSON.parse(opts.params || '{}'),
                    JSON.parse(opts.attributes || '{}')
                );
            });
        }

    }, BaseElement.prototype);

});
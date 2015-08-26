/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWebrtcVideoChatElement(BaseElement) {

    /**
     * Define WebrtcVideoChat Element
     * @param view
     * @param opts
     * @returns {WebrtcVideoChatElement}
     * @constructor
     * @class WebrtcVideoChatElement
     * @extends BaseElement
     */
    var WebrtcVideoChatElement = function WebrtcVideoChatElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('webrtc.video.chat', {resource: '/widgets'});

        return this;
    };

    return WebrtcVideoChatElement.extend('WebrtcVideoChatElement', {

        /**
         * Render Embedded content
         * @memberOf WebrtcVideoChatElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            this.$.append('<div />');
            this.$.append([
                '<form name="loginForm" id="login" action="#" onsubmit="return login(this);">',
                '<input type="text" name="username" id="username" placeholder="Pick a username!" />',
                '<input type="submit" name="login_submit" value="Log In">',
                '</form>'
            ].join(''));
            this.$.append([
                '<form name="callForm" id="call" action="#" onsubmit="return makeCall(this);">',
                '<input type="text" name="number" placeholder="Enter user to dial!" />',
                '<input type="submit" value="Call"/>',
                '</form>'
            ].join(''));

            /**
             * Get $element
             * @type {WebrtcVideoChatElement}
             */
            var $element = this;

            require([
                '//cdn.pubnub.com/pubnub-3.7.14.min.js',
                '//cdn.pubnub.com/webrtc/webrtc.js'
            ], function () {

                var $video_out = $element.$.find('div:first');

            });
        }

    }, BaseElement.prototype);

});

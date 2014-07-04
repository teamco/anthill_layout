/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePosttoolElement(BaseElement) {

    /**
     * Define Posttool Element
     * @param view
     * @param opts
     * @returns {PosttoolElement}
     * @constructor
     * @class PosttoolElement
     * @extends BaseElement
     */
    var PosttoolElement = function PosttoolElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('posttool', {
            resource: '/widgets'
        });

        return this;
    };

    return PosttoolElement.extend('PosttoolElement', {

        /**
         * Render Embedded content
         * @member PosttoolElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $postToolFrame = [
            '<div class="mainContainer"><input type="text" placeholder="Type your text here">',
            '<div class="buttonsContainer">',
            '<a class="image" title="Share Picture">Picture</a>',
            '<a class="link" title="Share Link">Link</a>',
            '<a class="shareBtn">SHARE</a>',
            '</div></div>'].join('');
            
            $element.view.controller.clearParentThumbnail();
            $element.$.append($postToolFrame);
        }

    }, BaseElement.prototype);

});
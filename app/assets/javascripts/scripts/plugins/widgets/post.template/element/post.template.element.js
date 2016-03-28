/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePostTemplateElement(PluginElement) {

    /**
     * Define PostTemplate Element
     * @param view
     * @param opts
     * @returns {PostTemplateElement}
     * @constructor
     * @class PostTemplateElement
     * @extends PluginElement
     */
    var PostTemplateElement = function PostTemplateElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('post.template', {
            resource: '/widgets'
        });

        return this;
    };

    return PostTemplateElement.extend('PostTemplateElement', {

        /**
         * Render Embedded content
         * @memberOf PostTemplateElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $construction = [
                 '<div class = "mainContainer">',
                 '<div class = "authorContainer"><i class = "authorImage" id = "" ></i></div>',
                 '<div class = "postHead"><h4> Gucci </h4></div>',
                 '<div class = "postContent"></div>',
                 '</div>'
            ].join('');
            $element.view.controller.clearParentThumbnail();
            $element.$.append($construction);
        }

    }, PluginElement.prototype);

});
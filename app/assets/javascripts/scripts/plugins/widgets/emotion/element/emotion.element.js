/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineEmotionElement(PluginElement) {

    /**
     * Define Emotion Element
     * @param view
     * @param opts
     * @returns {EmotionElement}
     * @constructor
     * @class EmotionElement
     * @extends PluginElement
     */
    var EmotionElement = function EmotionElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('emotion', {resource: '/widgets'});

        this.text = 'Great game. Now is time to embrace the losing team';

        return this;
    };

    return EmotionElement.extend('EmotionElement', {

        /**
         * Render Embedded content
         * @memberOf EmotionElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            var element = this;

            this.$.on('click', function() {
                element.view.modalDialog({
                    type: 'info',
                    title: 'Mood',
                    text: element.text,
                    cover: false
                });

                element.text = 'Don\'t be sad. You played well, maybe next time...';
            });
        }

    }, PluginElement.prototype);
});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineJoinUsElement(PluginElement) {

    /**
     * Define JoinUs Element
     * @param view
     * @param opts
     * @returns {JoinUsElement}
     * @constructor
     * @class JoinUsElement
     * @extends PluginElement
     */
    var JoinUsElement = function JoinUsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('join.us', {resource: '/widgets'});

        return this;
    };

    return JoinUsElement.extend('JoinUsElement', {

        /**
         * Render Embedded content
         * @memberOf JoinUsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            this.addContent(
                '<img src="/assets/demo/join_us" />'
            );

            this.$.off().on(
                'click.join',
                function() {
                    window.location.hash = '#/facility'
                }
            );
        }

    }, PluginElement.prototype);
});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMlkshkElement(PluginElement) {

    /**
     * Define Mlkshk Element
     * @param view
     * @param opts
     * @returns {MlkshkElement}
     * @constructor
     * @class MlkshkElement
     * @extends PluginElement
     */
    var MlkshkElement = function MlkshkElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('mlkshk', {resource: '/widgets'});

        return this;
    };

    return MlkshkElement.extend('MlkshkElement', {

        /**
         * Render Embedded content
         * @memberOf MlkshkElement
         * @param {string} code
         */
        renderEmbeddedContent: function renderEmbeddedContent(code) {

            if (!code) {
                return false;
            }

            this.$.append(
                $('<a />').attr({
                    href: 'https://mlkshk.com/p/' + code,
                    target: '_blank'
                }).append(
                    $('<img />').attr({
                        src: 'http://s.mlkshk.com/r/' + code
                    })
                )
            );
        }

    }, PluginElement.prototype);

});

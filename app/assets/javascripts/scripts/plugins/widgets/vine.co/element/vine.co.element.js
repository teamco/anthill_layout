/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineVineCoElement(BaseElement) {

    /**
     * Define VineCo Element
     * @param view
     * @param opts
     * @returns {VineCoElement}
     * @constructor
     * @class VineCoElement
     * @extends BaseElement
     */
    var VineCoElement = function VineCoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('vine.co', {resource: '/widgets'});

        return this;
    };

    return VineCoElement.extend('VineCoElement', {

        /**
         * Render Embedded content
         * @member VineCoElement
         */
        renderEmbeddedContent: function renderEmbeddedContent(link, postcard, audio, video) {

            /**
             * Define $element
             * @type {VineCoElement}
             */
            var $element = this;



            this.$.append(

            );
            //<iframe class="vine-embed" src="https://vine.co/v/Mipm1LMKVqJ/embed/simple?audio=1&related=0" width="600" height="600" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>
            //<iframe class="vine-embed" src="https://vine.co/v/Mipm1LMKVqJ/embed/simple?audio=1" width="600" height="600" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>
        }

    }, BaseElement.prototype);

});

/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePinterestElement(PluginElement) {

    /**
     * Define Pinterest Element
     * @param view
     * @param opts
     * @returns {PinterestElement}
     * @constructor
     * @class PinterestElement
     * @extends PluginElement
     */
    var PinterestElement = function PinterestElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pinterest', {resource: '/widgets'});

        return this;
    };

    return PinterestElement.extend('PinterestElement', {

        /**
         * Render Embedded content
         * @memberOf PinterestElement
         * @param {string} api
         * @param {string} url
         * @param {{
         *      type: string,
         *      iwidth: number,
         *      bwidth: number,
         *      bheight: number
         * }} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(api, url, opts) {

            if (_.isUndefined(url)) {
                return false;
            }

            require([api], function definePinterestApi() {

                // Get type
                var type = opts.type === 'Pin widget' ? 'embedPin' :
                        opts.type === 'Profile widget' ? 'embedUser' : 'embedBoard';
                /**
                 * Define pinterest params
                 * @type {string[]}
                 */
                var params = ['data-pin-do="' + type + '"'];

                if (opts.iwidth) {
                    params.push('data-pin-scale-width="' + opts.iwidth + '"');
                }
                if (opts.bwidth) {
                    params.push('data-pin-board-width="' + opts.bwidth + '"');
                }
                if (opts.bheight) {
                    params.push('data-pin-scale-height="' + opts.bheight + '"');
                }

                this.$.append(
                    $('<a class="follow-pinterest" ' + params.join(' ') + '/>').attr({
                        href: url
                    }).text('Follow Pinterest\'s board Pin pets on Pinterest.')
                );
            }.bind(this));
        }

    }, PluginElement.prototype);

});

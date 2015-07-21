/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineClocklinkElement(BaseElement) {

    /**
     * Define Clocklink Element
     * @param view
     * @param opts
     * @returns {ClocklinkElement}
     * @constructor
     * @class ClocklinkElement
     * @extends BaseElement
     * @extends Renderer
     */
    var ClocklinkElement = function ClocklinkElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('clocklink', {resource: '/widgets'});

        return this;
    };

    return ClocklinkElement.extend('ClocklinkElement', {

        /**
         * Render Embedded content
         * @memberOf ClocklinkElement
         * @param {{type: string, code: string}} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            // Define $embed
            var $embed = $(embed.code),
                $content;

            if (embed.type === 'embed') {

                $content = this.renderEmbed(embed.code, {
                    height: $embed.attr('height'),
                    width: $embed.attr('width')
                });
            }

            if (embed.type === 'iframe') {
                $content = this.renderIframe($embed.attr('src'));
            }

            if (embed.type === 'script') {

                var embedPattern = '<embed src="http://www.clocklink.com/clocks/{0}?{1}" width="{2}" height="{3}" wmode="{4}" type="application/x-shockwave-flash">',
                    urlParams = [];

                /**
                 * Get entity value
                 * @param value
                 * @returns {*}
                 * @private
                 */
                function _getEntityValue(value) {
                    return value.split('=')[1].replace(/"/g, '');
                }

                /**
                 * Get entity key
                 * @param value
                 * @returns {*}
                 * @private
                 */
                function _getEntityKey(value) {
                    return value.match(/obj.(\w+)/)[1];
                }

                /**
                 * Update pattern
                 * @param {RegExp} regex
                 * @param value
                 * @returns {*}
                 * @private
                 */
                function _updatePattern(regex, value) {
                    embedPattern = embedPattern.replace(
                        regex, _getEntityValue(value)
                    );
                }

                $.each($embed.last().text().split(';'), function _each(key, value) {

                    if (value.match(/obj\./)) {

                        if (value.match(/width/)) _updatePattern(/\{2}/, value);
                        else if (value.match(/height/)) _updatePattern(/\{3}/, value);
                        else if (value.match(/clockfile/)) _updatePattern(/\{0}/, value);
                        else if (value.match(/mode/)) _updatePattern(/\{4}/, value);
                        else urlParams.push(_getEntityKey(value) + '=' + _getEntityValue(value));
                    }
                });

                // Generate embed
                $embed = $(embedPattern.replace(/\{1}/, urlParams.join('&')));

                $content = this.renderEmbed($embed, {
                    height: $embed.attr('height'),
                    width: $embed.attr('width')
                });
            }

            this.$.append($content);
        }

    }, BaseElement.prototype);

});

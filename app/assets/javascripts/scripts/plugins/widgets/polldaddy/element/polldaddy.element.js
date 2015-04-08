/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePolldaddyElement(BaseElement) {

    /**
     * Define Polldaddy Element
     * @param view
     * @param opts
     * @returns {PolldaddyElement}
     * @constructor
     * @class PolldaddyElement
     * @extends BaseElement
     */
    var PolldaddyElement = function PolldaddyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('polldaddy', {resource: '/widgets'});

        return this;
    };

    return PolldaddyElement.extend('PolldaddyElement', {

        /**
         * Render Embedded content
         * @memberOf PolldaddyElement
         * @param {{type, id}} data
         */
        renderEmbeddedContent: function renderEmbeddedContent(data) {

            if (data.type === 'inline') {

                require([
                    '//static.polldaddy.com/p/' + data.id + '.js'
                ]);

            } else if (data.type === 'popup') {

                // TODO: unsupported
                require(
                    ['//i0.poll.fm/survey.js'],
                    function definePollDaddy() {
                        polldaddy.add({
                            type: 'slider',
                            embed: 'poll',
                            delay: 100,
                            visit: 'single',
                            id: data.id
                        });
                    }
                );
            }
        }

    }, BaseElement.prototype);

});

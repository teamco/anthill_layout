/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSapirElement(PluginElement) {

    /**
     * Define Sapir Element
     * @param view
     * @param opts
     * @returns {SapirElement}
     * @constructor
     * @class SapirElement
     * @extends PluginElement
     */
    var SapirElement = function SapirElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sapir', {resource: '/widgets'});

        return this;
    };

    return SapirElement.extend('SapirElement', {

        /**
         * Render Embedded content
         * @memberOf SapirElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var stadium = {
                "id": "5",
                "Name": "Volunteers game",
                "Location": "Eyal's home, Beit Jann, 32.964672, 35.373207",
                "creator": "Eyal",
                "Level": "Hard",
                "Participants": "5",
                "thumb": "http://myhero.com/images/g1/hero105394/HondurasSoccer5.jpg"
            };

            this.$.append([
                '<ul class="current-game"><li><img src="', stadium['thumb'],
                '"></li><li>',
                '<div>',
                '<strong>Name: </strong>' + stadium['Name'],
                '<br /><strong>Location: </strong>' + stadium['Location'],
                '<br /><strong>Facilitator: </strong>' + stadium['creator'],
                '<br /><strong>Level: </strong>' + stadium['Level'],
                '<br /><strong>Participants: </strong>' + stadium['Participants'],
                '</div>',
                '</li></ul>'
            ].join(''));
        }

    }, PluginElement.prototype);
});

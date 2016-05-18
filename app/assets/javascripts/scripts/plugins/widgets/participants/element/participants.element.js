/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineParticipantsElement(PluginElement) {

    /**
     * Define Participants Element
     * @param view
     * @param opts
     * @returns {ParticipantsElement}
     * @constructor
     * @class ParticipantsElement
     * @extends PluginElement
     */
    var ParticipantsElement = function ParticipantsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('participants', {resource: '/widgets'});

        return this;
    };

    return ParticipantsElement.extend('ParticipantsElement', {

        /**
         * Render Embedded content
         * @memberOf ParticipantsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var data = [
                {
                    "name": "John",
                    "fairPlayPoints": "4345",
                    "icon": "1.jpg"
                },
                {
                    "name": "Basma",
                    "fairPlayPoints": "51",
                    "icon": "2.jpg"
                },
                {
                    "name": "Anissa",
                    "fairPlayPoints": "602",
                    "icon": "3.jpg"
                },
                // {
                //     "name": "David",
                //     "fairPlayPoints": "7",
                //     "icon": "4.jpg"
                // },
                {
                    "name": "Yossi",
                    "fairPlayPoints": "84",
                    "icon": "5.jpg"
                },
                {
                    "name": "Nissim",
                    "fairPlayPoints": "92",
                    "icon": "6.jpg"
                }
            ];

            this.$.append('<ul />');

            var $ul = this.$.find('ul');
            for (var i = 0; i < data.length; i++) {

                $ul.append([
                    '<li>',
                    '<img class="thumbnail" src="/assets/demo/participants/', (i + 1), '.jpg" />',
                    '<p>', data[i].name, ' (', data[i].fairPlayPoints, ')</p>',
                    '<img class="chart" src="/assets/demo/participants/chart', (i + 1), '.png" />',
                    '</li>'
                ].join(''));
            }

        }

    }, PluginElement.prototype);
});

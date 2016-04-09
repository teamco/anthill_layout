/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineOrphusElement(PluginElement) {

    /**
     * Define Orphus Element
     * @param view
     * @param opts
     * @returns {OrphusElement}
     * @constructor
     * @class OrphusElement
     * @extends PluginElement
     */
    var OrphusElement = function OrphusElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('orphus', {resource: '/widgets'});

        return this;
    };

    return OrphusElement.extend('OrphusElement', {

        /**
         * Render Embedded content
         * @memberOf OrphusElement
         * @param {string} main
         */
        renderEmbeddedContent: function renderEmbeddedContent(main) {

            this.setHtml([
                '<a href="http://orphus.ru" id="orphus" target="_blank">',
                '<img alt="Orphus system" src="/assets/scripts/plugins/widgets/orphus/images/orphus.gif" border="0" width="121" height="21" />',
                '</a>'
            ].join(''));

            /**
             * Define function
             * @type {Function}
             */
            var mainScript = new window.Function(main);

            // Run script
            mainScript();
        }

    }, PluginElement.prototype);
});

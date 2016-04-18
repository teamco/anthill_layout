/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSapOpenuiElement(PluginElement) {

    /**
     * Define SapOpenui Element
     * @param view
     * @param opts
     * @returns {SapOpenuiElement}
     * @constructor
     * @class SapOpenuiElement
     * @extends PluginElement
     */
    var SapOpenuiElement = function SapOpenuiElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('sap.openui', {resource: '/widgets'});

        return this;
    };

    return SapOpenuiElement.extend('SapOpenuiElement', {

        /**
         * Render Embedded content
         * @memberOf SapOpenuiElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            var id = 'sap-ui-bootstrap',
                $element = this;

            if ($('#' + id).length) {
                return false;
            }

            this.createScript({
                id: id,
                src: 'https://openui5.hana.ondemand.com/resources/sap-ui-core.js',
                'data-sap-ui-theme': "sap_bluecrystal",
                'data-sap-ui-libs': "sap.m",
                'data-sap-ui-bindingSyntax': "complex",
                'data-sap-ui-compatVersion': "edge",
                'data-sap-ui-preload': "async"
            });

            this.base.waitFor(

                function condition() {
                    return typeof sap !== 'undefined';
                },

                function callback() {

                    jQuery.sap.registerModulePath("sap.ui.demo.wt", '/assets/scripts/plugins/widgets/sap.openui/lib');

                    sap.ui.getCore().attachInit(function () {
                        new sap.ui.xmlview({
                            viewName: "sap.ui.demo.wt.App"
                        }).placeAt($element.id);
                    });
                },

                function fallback() {
                    $element.view.scope.logger.warn('Timeout. Unable to load SAP OpenUI5');
                }
            );
        }

    }, PluginElement.prototype);
});

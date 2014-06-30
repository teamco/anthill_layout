/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePetradarElement(BaseElement) {

    /**
     * Define Petradar Element
     * @param view
     * @param opts
     * @returns {PetradarElement}
     * @constructor
     * @class PetradarElement
     * @extends BaseElement
     */
    var PetradarElement = function PetradarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('petradar', {
            resource: '/widgets'
        });

        return this;
    };

    return PetradarElement.extend('PetradarElement', {

        /**
         * Render Embedded content
         * @member PetradarElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;


            require([
                'async!https://maps.googleapis.com/maps/api/js'
            ], function getPetsAroundMe() {

                require(['plugins/widgets/petradar/mvc/petradar.behavior'], function behavior() {

                    var $radarContainer = ['<div class="close_friends_container">',
                        '<h2 class="main_title">Pets Around You</h2>',
                        '<div id="map_canvas"></div>',
                        '</div>'].join('');

                    $element.view.controller.clearParentThumbnail();
                    $element.$.append(
                        $radarContainer
                    );

                });
            });

        }

    }, BaseElement.prototype);

});
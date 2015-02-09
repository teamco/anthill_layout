/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePetRadarElement(BaseElement) {

    /**
     * Define PetRadar Element
     * @param view
     * @param opts
     * @returns {PetRadarElement}
     * @constructor
     * @class PetRadarElement
     * @extends BaseElement
     */
    var PetRadarElement = function PetRadarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('pet.radar', {
            resource: '/widgets'
        });

        return this;
    };

    return PetRadarElement.extend('PetRadarElement', {

        /**
         * Render Embedded content
         * @member PetRadarElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;


            require([
                'async!https://maps.googleapis.com/maps/api/js'
            ], function getPetsAroundMe() {

                require(['plugins/widgets/pet.radar/mvc/pet.radar.behavior'], function behavior(PetRadarBehavior) {

                    var $radarContainer = ['<div class="close_friends_container">',
                        '<h2 class="main_title">Pets Around You</h2>',
                        '<div id="map_canvas"></div>',
                        '</div>'].join('');

                    $element.view.controller.clearParentThumbnail();
                    $element.$.append(
                        $radarContainer
                    );

                    var behavior = new PetRadarBehavior($element);
                });
            });

        }

    }, BaseElement.prototype);
});
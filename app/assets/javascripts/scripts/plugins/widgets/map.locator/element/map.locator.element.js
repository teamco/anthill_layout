/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMapLocatorElement(BaseElement) {

    /**
     * Define MapLocator Element
     * @param view
     * @param opts
     * @returns {MapLocatorElement}
     * @constructor
     * @class MapLocatorElement
     * @extends BaseElement
     */
    var MapLocatorElement = function MapLocatorElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('map.locator', {resource: '/widgets'});

        /**
         * Define map style
         * @member MapLocatorElement
         * @type {Array}
         */
        this.mapStyle = [];

        /**
         * Define current type
         * @member MapLocatorElement
         * @type {string[]}
         */
        this.currentType = ['pet_store'];

        return this;
    };

    return MapLocatorElement.extend('MapLocatorElement', {

        /**
         * Define map style
         * @member MapLocatorElement
         * @param opts
         */
        defineMapStyle: function defineMapStyle(opts) {

            this.mapStyle.push({
                featureType: 'water',
                stylers: [
                    {color: opts.waterColor},
                    {visibility: opts.waterVisibility}
                ]
            });

            this.mapStyle.push({
                featureType: 'landscape',
                stylers: [
                    {color: opts.landscapeColor}
                ]
            });

            this.mapStyle.push({
                featureType: 'road',
                stylers: [
                    {saturation: opts.roadSaturation},
                    {lightness: opts.roadLightness}
                ]
            });

            this.mapStyle.push({
                featureType: 'road.highway',
                stylers: [
                    {visibility: opts.roadHighwayVisibility}
                ]
            });

            this.mapStyle.push({
                featureType: 'road.arterial',
                elementType: opts.roadArterialElementType,
                stylers: [
                    {visibility: opts.roadArterialVisibility}
                ]
            });

            this.mapStyle.push({
                featureType: 'administrative',
                elementType: opts.administrativeElementType,
                stylers: [
                    {color: opts.administrativeColor}
                ]
            });

            this.mapStyle.push({
                featureType: 'transit',
                stylers: [
                    {visibility: opts.transitVisibility}
                ]
            });

            this.mapStyle.push({
                featureType: 'poi',
                stylers: [
                    {visibility: opts.poiVisibility}
                ]
            });
        },

        /**
         * Render Embedded content
         * @member MapLocatorElement
         * @param {{}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            /**
             * Define scope
             * @type {MapLocatorElement}
             */
            var scope = this;

            scope.view.controller.clearParentThumbnail();

            scope.defineMapStyle(opts);

            require([
                'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=true'
            ], function defineGoogleMapsApi() {

                /**
                 * Set visual refresh
                 * @type {boolean}
                 */
                google.maps.visualRefresh = true;

                /**
                 * Define direction service
                 * @member MapLocatorElement
                 * @type {google.maps.DirectionsService}
                 */
                scope.directionsService = new google.maps.DirectionsService();

                /**
                 * Define directions display
                 * @member MapLocatorElement
                 * @type {google.maps.DirectionsRenderer}
                 */
                scope.directionsDisplay = new google.maps.DirectionsRenderer();

                /**
                 * Define position
                 * @member MapLocatorElement
                 * @type {google.maps.LatLng}
                 */
                scope.position = new google.maps.LatLng(
                    opts.latitude,
                    opts.longitude
                );

                /**
                 * Define map
                 * @member MapLocatorElement
                 * @type {google.maps.Map}
                 */
                scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
                    center: scope.position,
                    zoom: opts.zoom || 13,
                    styles: scope.mapStyle,
                    disableDefaultUI: true
                });

                /**
                 * Define info window
                 * @member MapLocatorElement
                 * @type {google.maps.InfoWindow}
                 */
                scope.infowindow = new google.maps.InfoWindow({
                    map: scope.map,
                    position: scope.position,
                    content: 'Location found using HTML5.'
                });

                scope.directionsDisplay.setMap(
                    scope.map
                );

                /**
                 * Define service
                 * @type {google.maps.places.PlacesService}
                 */
                scope.service = new google.maps.places.PlacesService(
                    scope.map
                );

                scope.service.nearbySearch({

                    radius: opts.searchRadius,
                    location: scope.position,
                    types: scope.currentType

                }, scope.createMarkers.bind(scope));
            });

            this.$.append(
                this.renderDomTemplate()
            );

            var radarContainer = $('.radarContainer', this.$),
                radarMenu = $('.mapMenu', this.$),
                searchButton = $('#searchPlaces', this.$);

            radarMenu.mouseenter(function () {
                $(this).addClass('extend');
            });

            radarMenu.mouseleave(function () {
                $(this).removeClass('extend');
            });

            searchButton.click(function () {
                initialize();
            });

            $(".dial", this.$).knob({
                'min': 1,
                'max': 10,
                'angleOffset': 310,
                'angleArc': 100
            });

            $("input[name=place]:radio", this.$).change(function () {
                scope.currentType = [$(this).val()];
            });
        },

        /**
         * Render DOM template
         * @member MapLocatorElement
         * @returns {string}
         */
        renderDomTemplate: function renderDomTemplate() {
            return [
                '<div class="radarContainer">',
                '<div class="mapMenu">',
                '<input type="text" value="3" disabled class="dial">',
                '<div class="radiosContainer">',
                '<label>Pets Shops</label>',
                '<input type="radio" name="place" class="css-checkbox" id="map-locator-pet-store" checked="checked" value="pet_store">',
                '<label for="map-locator-pet-store" class="css-label"></label>',
                '<label>Veterinarians</label>',
                '<input type="radio" name="place" class="css-checkbox" id="map-locator-veterinary-care" value="veterinary_care">',
                '<label for="map-locator-veterinary-care" class="css-label"></label>',
                '</div>',
                '<a class="findPlaces" id="searchPlaces">Search</a>',
                '<div class="arcBackground"></div>',
                '</div>',
                '<div id="map-canvas"></div>',
                '</div>'
            ].join('')
        },

        /**
         * Draw search radius visual guide
         * @member MapLocatorElement
         * @param marker
         */
        drawCircle: function drawCircle(marker) {

            /**
             * Define circle element
             * @type {google.maps.Circle}
             */
            this.circle = new google.maps.Circle({
                map: map,
                radius: searchRadius,
                fillColor: '#48E990',
                strokeColor: '#11BF5F',
                strokeOpacity: 0.15,
                fillOpacity: 0.08,
                center: pos
            });

            this.circle.bindTo('center', marker, 'position');
        },

        /**
         * Create markers
         * @member MapLocatorElement
         * @param place
         */
        createMarker: function createMarker(place) {

            /**
             * Define location
             * @type {*}
             */
            var location = place.geometry.location;

            var marker = new google.maps.Marker({
                map: map,
                position: location
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
                calcRoute(location);
            });
        },

        /**
         * Create markers
         * @member MapLocatorElement
         * @param results
         * @param status
         */
        createMarkers: function createMarkers(results, status) {

            this.createMyLocationMarker(pos);

            if (status == google.maps.places.PlacesServiceStatus.OK) {

                for (var i = 0; i < results.length; i++) {

                    this.createMarker(results[i]);
                }

            } else {

                $('.radarContainer').append([
                    '<div class="noResultsMessage animated shake">',
                    'No results found! Try to extend search range.',
                    '</div>'
                ].join(''));

                setTimeout(function () {
                    $('.noResultsMessage').remove();
                }, 4000);
            }
        },

        /**
         * Create my location marker
         * @member MapLocatorElement
         * @param place
         */
        createMyLocationMarker: function createMyLocationMarker(place) {

            /**
             * Define marker
             * @type {google.maps.Marker}
             */
            var marker = new google.maps.Marker({
                map: this.ma,
                position: place,
                icon: 'smallMarker.png'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('I am here');
                infowindow.open(map, this);
            });

            this.drawCircle(marker);
        }

    }, BaseElement.prototype);

});
/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineHereMapsForLifeElement(PluginElement) {

  /**
   * Define HereMapsForLife Element
   * @param view
   * @param opts
   * @returns {HereMapsForLifeElement}
   * @constructor
   * @class HereMapsForLifeElement
   * @extends PluginElement
   */
  var HereMapsForLifeElement = function HereMapsForLifeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('here.maps.for.life', {resource: '/widgets'});

    return this;
  };

  return HereMapsForLifeElement.extend('HereMapsForLifeElement', {

    /**
     * Render Embedded content
     * @memberOf HereMapsForLifeElement
     * @param {{
         *      api_id: string,
         *      app_code: string,
         *      location: boolean,
         *      bounds: boolean,
         *      draggable_marker: boolean,
         *      venues_layers: boolean,
         *      draggable_marker: boolean,
         *      restrict_movement: boolean,
         *      marker: boolean,
         *      terrain_map: boolean,
         *      location: string,
         *      zoom: string,
         *      latitude_longitude: string,
         *      location_marker: string,
         *      nwse_corners: string,
         *      restrict_bounds: string
         * }} opts
     */
    renderEmbeddedContent: function renderEmbeddedContent(opts) {

      /**
       * Get element
       * @type {HereMapsForLifeElement}
       */
      var element = this;

      /**
       * Get scope
       * @type {HereMapsForLife}
       */
      var scope = element.view.scope;

      // Get libs
      var lib = scope.model.getConfig('lib');

      this.createLinkCss({href: lib.css});

      require([lib.js[0]], function _loadCore() {
        require([lib.js[1], lib.js[2], lib.js[3]], function _loadServices() {
          // Initial config
          element.mapInitialSetup(opts);
        })
      });
    },

    /**
     * Setup map
     * @memberOf HereMapsForLifeElement
     * @param {{terrain_map: boolean}} opts
     */
    mapInitialSetup: function mapInitialSetup(opts) {

      //Step 1: initialize communication with the platform
      var platform = new H.service.Platform({
        app_id: opts.api_id,
        app_code: opts.app_code,
        useCIT: true,
        useHTTPS: true
      });

      var defaultLayers = platform.createDefaultLayers();

      //Step 2: initialize a map  - not specificing a location will give a
      // whole world view.
      var map = new H.Map(
          this.$[0],
          defaultLayers.normal.map
      );

      // Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile
      // touch environments)
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI components
      var ui = H.ui.UI.createDefault(map, defaultLayers);

      if (opts.terrain_map) {

        // Remove map settings as unnecessary
        ui.removeControl('mapsettings');
      }

      this.mapInteraction(map, platform, behavior, ui, opts);
    },

    /**
     * Map interaction
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map
     * @param {H.service.Platform} platform
     * @param {H.mapevents.Behavior} behavior
     * @param {H.ui.UI} ui
     * @param opts
     */
    mapInteraction: function mapInteraction(map, platform, behavior, ui, opts) {

      if (opts.location) this.moveMapToLocation(map, opts);
      if (opts.location && opts.terrain_map) this.terrainMap(map, platform);
      if (opts.bounds) this.setMapViewBounds(map, opts);
      if (opts.marker) this.addMarkerToMap(map, behavior, opts);
    },

    /**
     * Switches the map type to a topographical map
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                               A HERE Map instance
     *     within the application
     * @param {H.service.Platform} platform             A stub class to access
     *     HERE services
     */
    terrainMap: function terrainMap(map, platform) {

      var aerialMapTileService = platform.getMapTileService({
        type: 'aerial'
      });

      var terrainMap = aerialMapTileService.createTileLayer(
          'maptile',
          'terrain.day',
          256,
          'png8'
      );

      map.setBaseLayer(terrainMap);
    },

    /**
     * Restricts a moveable map to a given rectangle.
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                               A HERE Map instance
     *     within the application
     * @param {{restrict_bounds}} opts
     */
    restrictMap: function restrictMap(map, opts) {

      var restrict = (opts.restrict_bounds || '').split(',');
      var bounds = new H.geo.Rect(restrict[0], restrict[1], restrict[2], restrict[3]);

      map.getViewModel().addEventListener('sync', function () {
        var center = map.getCenter();

        if (!bounds.containsPoint(center)) {
          if (center.lat > bounds.getTop()) {
            center.lat = bounds.getTop();
          } else if (center.lat < bounds.getBottom()) {
            center.lat = bounds.getBottom();
          }
          if (center.lng < bounds.getLeft()) {
            center.lng = bounds.getLeft();
          } else if (center.lng > bounds.getRight()) {
            center.lng = bounds.getRight();
          }
          map.setCenter(center);
        }
      });

      //Debug code to visualize where your restriction is
      map.addObject(new H.map.Rect(bounds, {
            style: {
              fillColor: 'rgba(55, 85, 170, 0.1)',
              strokeColor: 'rgba(55, 85, 170, 0.6)',
              lineWidth: 8
            }
          }
      ));
    },

    /**
     * Adds markers to the map highlighting the locations.
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                                   A HERE Map instance
     *     within the application
     * @param {H.mapevents.Behavior} behavior               Behavior implements
     *     default interactions for pan/zoom
     * @param {{location_marker, draggable_marker}} opts
     */
    addMarkerToMap: function addMarkerToMap(map, behavior, opts) {

      var locations = (opts.location_marker || '').split('],'),
          l = locations.length, i = 0, marker, sl;

      for (; i < l; i++) {
        sl = locations[i].match(/\d+.\d+/g);
        marker = new H.map.Marker({lat: sl[0], lng: sl[1]});
        this.setMarkerAsDraggable(map, behavior, marker, opts);
        map.addObject(marker);
      }
    },

    /**
     * Adds markers to the map highlighting the locations.
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                                   A HERE Map instance
     *     within the application
     * @param {H.mapevents.Behavior} behavior               Behavior implements
     *     default interactions for pan/zoom
     * @param {H.map.Marker} marker
     * @param {{draggable_marker}} opts
     */
    setMarkerAsDraggable: function setMarkerAsDraggable(map, behavior, marker,
        opts) {

      if (!opts.draggable_marker) {
        return false;
      }

      marker.draggable = true;

      // disable the default draggability of the underlying map
      // when starting to drag a marker object:
      map.addEventListener('dragstart', function _dragstart(ev) {
        var target = ev.target;
        if (target instanceof H.map.Marker) {
          behavior.disable();
        }
      }, false);

      // re-enable the default draggability of the underlying map
      // when dragging has completed
      map.addEventListener('dragend', function _dragend(ev) {
        var target = ev.target;
        if (target instanceof mapsjs.map.Marker) {
          behavior.enable();
        }
      }, false);

      // Listen to the drag event and move the position of the marker
      // as necessary
      map.addEventListener('drag', function _drag(ev) {
        var target = ev.target,
            pointer = ev.currentPointer;
        if (target instanceof mapsjs.map.Marker) {
          target.setPosition(
              map.screenToGeo(pointer.viewportX, pointer.viewportY));
        }
      }, false);

    },

    /**
     * Moves the map to display over Location
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                                   A HERE Map instance
     *     within the application
     * @param {{latitude_longitude, zoom}} opts
     */
    moveMapToLocation: function moveMapToLocation(map, opts) {
      var location = (opts.latitude_longitude || '').split(',');
      map.setCenter({lat: location[0], lng: location[1]});
      map.setZoom(opts.zoom);
    },

    /**
     * Moves the map to display over Location using viewBounds
     * @memberOf HereMapsForLifeElement
     * @param  {H.Map} map                                  A HERE Map instance
     *     within the application
     * @param {{nwse_corners}} opts
     */
    setMapViewBounds: function setMapViewBounds(map, opts) {
      var bounds = (opts.nwse_corners || '').split(',');
      var bbox = new H.geo.Rect(bounds[0], bounds[1], bounds[2], bounds[3]);
      map.setViewBounds(bbox);
    },

    /**
     * Shows how to add venue objects to the map, change default styling
     * and change a floor level for all venues.
     * @see http://developer.here.com/rest-apis/documentation/venue-maps
     * @memberOf HereMapsForLifeElement
     * @param {H.Map} map                                   A HERE Map instance
     *     within the application
     * @param {H.service.Platform} platform                 Platform instance
     *     within the application
     */
    addVenueLayer: function addVenueLayer(map, platform) {

      /**
       * Changes the default style for H&M shops
       * @param {H.service.venues.Space}
       * @private
       */
      function _onSpaceCreated(space) {
        // getData for spaces contains data from the Venue Interaction Tile
        // API,
        // see
        // https://developer.here.com/rest-apis/documentation/venue-maps/topics/resource-type-venue-interaction-tile.html
        if (space.getData().preview === 'H&M') {
          space.setStyle({
            fillColor: 'rgba(0,255,0,0.3)'
          });
        }
      }

      /**
       * Custom helper function for adding buttons
       * Template function for displaying controls with a heading and buttons
       * @param title
       * @param buttons
       * @private
       */
      function _renderControls(title, buttons) {

        var containerNode = document.createElement('div');

        containerNode.innerHTML =
            '<h4 class="title">' + title + '</h4><div class="btn-group"></div>';
        containerNode.setAttribute('class', 'template');

        Object.keys(buttons).forEach(function (label) {
          var input = document.createElement('input');
          input.value = label;
          input.type = 'button';
          input.onclick = buttons[label];
          input.className = "btn btn-sm btn-default";
          containerNode.lastChild.appendChild(input);
        });

        map.getElement().appendChild(containerNode);
      }

      // Create a tile layer, which will display venues
      var customVenueLayer = platform.getVenueService().createTileLayer({
        // Provide a callback that will be called for each newly created space
        onSpaceCreated: _onSpaceCreated
      });

      // Get TileProvider from Venue Layer
      var venueProvider = customVenueLayer.getProvider();
      // Add venues layer to the map
      map.addLayer(customVenueLayer);

      // Use the custom function (i.e. not a part of the API)
      // to render buttons with corresponding click callbacks
      _renderControls('Change floor', {
        '+1 Level': function () {
          // Increase global floor level on the venue provider
          venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() + 1);
        },
        '-1 Level': function () {
          // Decrease global floor level on the venue provider
          venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() - 1);
        }
      });
    }

  }, PluginElement.prototype);
});
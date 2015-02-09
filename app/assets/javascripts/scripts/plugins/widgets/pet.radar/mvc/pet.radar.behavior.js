define([
    'modules/Geolocation'
], function definePetRadarBehavior(BaseGeolocation) {

    /**
     * Define Pet Radar Behavior
     * @class PetRadarBehavior
     * @extends BaseGeolocation
     * @constructor
     */
    var PetRadarBehavior = function PetRadarBehavior() {

        /**
         * Define user container
         * @member PetRadarBehavior
         * @type {*|jQuery|HTMLElement}
         */
        this.usersContainer = $('.close_friends_container');

        /**
         * Define amount
         * @member PetRadarBehavior\
         * @type {number}
         */
        this.circlesAmount = 0;

        /**
         * Define images
         * @member PetRadarBehavior
         * @type {string[]}
         */
        this.images = [
            'imggg/download.jpg',
            'imggg/download2.jpg',
            'imggg/images3.jpg',
            'imggg/images4.jpg',
            'imggg/images5.jpg',
            'imggg/images6.jpg',
            'imggg/images7.jpg',
            'imggg/images8.jpg',
            'imggg/images9.jpg',
            'imggg/images10.jpg',
            'imggg/images11.jpg',
            'imggg/images12.jpg',
            'imggg/images13.jpg',
            'imggg/images14.jpg',
            'imggg/images15.jpg',
            'imggg/images16.jpg',
            'imggg/images17.jpg',
            'imggg/images18.jpg',
            'imggg/images19.jpg',
            'imggg/images20.jpg'
        ];

        /**
         * Define container width
         * @member PetRadarBehavior
         * @type {Number}
         */
        this.screenWidth = window.outerWidth;

        this.initialize();
    };

    return PetRadarBehavior.extend('PetRadarBehavior', {

        /**
         * Define init
         * @member PetRadarBehavior
         */
        initialize: function initialize() {

            this.getPosition(
                function _setLocation(position) {

                    var myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var map_canvas = document.getElementById('map_canvas');
                    var map_options = {
                        center: myPosition,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: false,
                        navigationControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        draggable: false,
                        disableDoubleClickZoom: true,
                        disableDefaultUI: true
                    };

                    var map = new google.maps.Map(map_canvas, map_options);

                    this.addPetsToMap();
                }
            );

        },

        addPetsToMap: function addPetsToMap() {
            var interval = window.setInterval(function () {
                this.createUserCircle();
                this.circlesAmount++;
                if (this.circlesAmount === this.images.length) {
                    window.clearInterval(interval);
                }

            }.bind(this), 100);
        },

        createUserCircle: function createUserCircle() {
            var x, y;
            if (this.screenWidth < 1400) {
                x = Math.floor(Math.random() * 400);
                y = Math.floor(Math.random() * 300);
            } else {
                x = Math.floor(Math.random() * 550);
                y = Math.floor(Math.random() * 550);
            }
            //console.log(y + " " + x);
            this.usersContainer.append('<div class="pet_account animated pulse" style="top:' + y + 'px; left:' + x + 'px;' + '"><img style="height:100px;" src="' + this.images[this.circlesAmount] + '"></div>');
        }

    }, BaseGeolocation.prototype);
});
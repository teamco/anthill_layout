function initialize(position) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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
            }

            var map = new google.maps.Map(map_canvas, map_options)
            addPetsToMap();
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

var usersContainer = $('.close_friends_container');
var circlesAmount = 0;
var images = ['imggg/download.jpg', 'imggg/download2.jpg', 'imggg/images3.jpg', 'imggg/images4.jpg', 'imggg/images5.jpg', 'imggg/images6.jpg', 'imggg/images7.jpg', 'imggg/images8.jpg', 'imggg/images9.jpg', 'imggg/images10.jpg', 'imggg/images11.jpg', 'imggg/images12.jpg', 'imggg/images13.jpg', 'imggg/images14.jpg', 'imggg/images15.jpg', 'imggg/images16.jpg', 'imggg/images17.jpg', 'imggg/images18.jpg', 'imggg/images19.jpg', 'imggg/images20.jpg'];
var screenWidth = window.outerWidth;
// addPetsToMap();

$(window).resize(function () {
})


function addPetsToMap() {
    var interval = setInterval(function () {
        createUserCircle();
        circlesAmount++;
        if (circlesAmount == 20) {
            clearInterval(interval);
        };
    }, 100);
}

function createUserCircle() {
    if (screenWidth < 1400) {
        var x = Math.floor(Math.random() * 400);
        var y = Math.floor(Math.random() * 300);
    } else {
        var x = Math.floor(Math.random() * 550);
        var y = Math.floor(Math.random() * 550);
    }
    //console.log(y + " " + x);
    usersContainer.append('<div class="pet_account animated pulse" style="top:' + y + 'px; left:' + x + 'px;' + '"><img style="height:100px;" src="' + images[circlesAmount] + '"></div>');
}
/*************** FACEBOOK LOGIN IMPLEMENTATION ********************/

FB.init({
    appId: '175866189220686',
    status: true,
    cookie: true,
    xfbml: true
});

function doLogin() {
    FB.login(function (response) {
        if (response.session) {
            FB.api('/me', function (response) {
                alert('Welcome ' + response.name);
                alert('Full details: ' + JSON.stringify(response));
            });
        }
    }, {
        perms: ''
    });
}

FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
    } else {
        // the user isn't logged in to Facebook.
    }
});

/********************************************************************/









/*************** GOOGLE LOGIN IMPLEMENTATION ************************/

(function () {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();


function logout() {
    gapi.auth.signOut();
    location.reload();
}

function login() {
    var myParams = {
        'clientid': '315126228894-7okf1ticiidfo75jmkcr7kgd0sbde1u5.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'callback': 'loginCallback',
        'approvalprompt': 'force',
        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);
}

function loginCallback(result) {
    if (result['status']['signed_in']) {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            var email = '';
            if (resp['emails']) {
                for (i = 0; i < resp['emails'].length; i++) {
                    if (resp['emails'][i]['type'] == 'account') {
                        email = resp['emails'][i]['value'];
                    }
                }
            }

            var str = "Name:" + resp['displayName'] + "<br>";
            str += "Image:" + resp['image']['url'] + "<br>";
            str += "<img src='" + resp['image']['url'] + "' /><br>";

            str += "URL:" + resp['url'] + "<br>";
            str += "Email:" + email + "<br>";
            document.getElementById("profile").innerHTML = str;
        });

    }

}

function onLoadCallback() {
    gapi.client.setApiKey('AIzaSyBbFetUPK0hlkp8LsEUi0WeAd-vqCLaLck');
    gapi.client.load('plus', 'v1', function () {});
}

/********************************************************************/


function showModal() {
    $('#myModal').modal('show');
}
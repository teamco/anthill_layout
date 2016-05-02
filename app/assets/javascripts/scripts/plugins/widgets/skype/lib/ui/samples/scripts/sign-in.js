//sign in sample:
//if user has signed in give prompt, otherwise go to index page
$(function () {
    var client = window.skypeWebApp;
    if (window.skypeWebApp.signInManager.state() == "SignedIn") {
        $('.content').html('<div class="signed-in">You have signed in.</div>');
    }
    else {
        $('.content').html('<div class="signed-in">Signing in...</div>');
        signIn();
    }
    // when the user clicks on the "Sign In" button
    $('#btn-sign-in').click(function () {
        signIn();
        // start signing in
        //$(".modal").show();
        //client.signInManager.signIn({
        //    version: config.version,
        //    username: $('#txt-username').val(),
        //    password: $('#txt-password').val(),
		//	enableInternalNS: true
        //}).then(function () {
        //    // when the sign in operation succeeds display the user name
        //    $(".modal").hide();
        //    console.log('Signed in as ' + client.personsAndGroupsManager.mePerson.displayName());
        //    $(".menu #sign-out").click();
        //    $("#anonymous-join").addClass("disable");
        //}, function (error) {
        //    // if something goes wrong in either of the steps above,
        //    // display the error message
        //    $(".modal").hide();
        //    alert("Can't sign in, please check the user name and password.");
        //    window.location.reload();
        //    console.log(error || 'Cannot sign in');
        //});
    });
    $('#txt-username, #txt-password').keypress(function (evt) {
        if (evt.keyCode == 13) {
            $("#btn-sign-in").click();
        }
    });
    $("#btn-token-sign-in").click(function () {
        $(".modal").show();
        var domain = $("#txt-domain").val();
        var access_token = $("#txt-token").val();
        var Bearercwt = 'Bearer cwt=';
        var Bearer = 'Bearer ';
        var cwt = 'cwt';
        if (access_token.indexOf(cwt) == -1) {
            access_token = Bearercwt + access_token;
        }
        if (access_token.indexOf(Bearer) == -1) {
            access_token = Bearer + access_token;
        }
        var options = {
            auth: function (req, send) {
                req.headers['Authorization'] = access_token.trim();
                return send(req);
            },
            domain: domain
        };
        client.signInManager.signIn(options).then(function () {
            $(".modal").hide();
            console.log('Signed in as ' + client.personsAndGroupsManager.mePerson.displayName());
            $("#anonymous-join").addClass("disable");
            $(".menu #sign-in").click();
        });
    });
    $(".topology-login").click(function () {
        $(".login-options").hide();
        $(".token-sign-in").hide();
        $(".sign-in").show();
    });
    $(".token-login").click(function () {
        $(".login-options").hide();
        $(".sign-in").hide();
        $(".token-sign-in").show();
    });

    function signIn() {
        params =
     {
         "client_id": "d1763d46-5e84-413f-97f0-faa9c49a8e40",
         "origins": ["https://webdir.online.lync.com/autodiscover/autodiscoverservice.svc/root"],
         "cors": true,
         "version": 'SkypeOnlinePreviewApp/1.0.0',
         "redirect_uri": '/token.html'
     };
        // start signing in
        $(".modal").show();

        client.signInManager.signIn(
            params
        ).then(function () {
            // when the sign in operation succeeds display the user name
            $(".modal").hide();
            console.log('Signed in as ' + client.personsAndGroupsManager.mePerson.displayName());
                if (!window.skypeWebApp.personsAndGroupsManager.mePerson.id()
                    && !window.skypeWebApp.personsAndGroupsManager.mePerson.avatarUrl()
                    && !window.skypeWebApp.personsAndGroupsManager.mePerson.email()
                    && !window.skypeWebApp.personsAndGroupsManager.mePerson.displayName()
                    && !window.skypeWebApp.personsAndGroupsManager.mePerson.title()) {
                    window['noMeResource'] = true;
                }
            $(".menu #sign-in").click();
            $("#anonymous-join").addClass("disable");
        }, function (error) {
            // if something goes wrong in either of the steps above,
            // display the error message
            $(".modal").hide();
            alert("Can't sign in, please check the user name and password.");
            //window.location.reload();
            console.log(error || 'Cannot sign in');
        });
    }
});

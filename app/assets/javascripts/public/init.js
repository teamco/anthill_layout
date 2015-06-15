(function () {

    var script = document.getElementById('require-init'),
        site = script.getAttribute('data-resource'),
        uuid = script.getAttribute('data-uuid'),
        version = parseInt(script.getAttribute('data-version'), 10) || 1,
        user = script.getAttribute('data-user'),
        mode = script.getAttribute('data-mode');

    require(['../scripts/core/config/main'], function defineDelegator(config) {

        config.data({
            site: site,
            uuid: uuid,
            version: version,
            user: user,
            mode: mode
        });
    });

})();
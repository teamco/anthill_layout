/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineTheWeatherNetworkElement(PluginElement) {

  /**
   * Define TheWeatherNetwork Element
   * @param view
   * @param opts
   * @returns {TheWeatherNetworkElement}
   * @constructor
   * @class TheWeatherNetworkElement
   * @extends PluginElement
   */
  var TheWeatherNetworkElement = function TheWeatherNetworkElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('the.weather.network', {resource: '/widgets'});

    return this;
  };

  return TheWeatherNetworkElement.extend('TheWeatherNetworkElement', {

    /**
     * Render Embedded content
     * @memberOf TheWeatherNetworkElement
     * @param {string} html
     */
    renderEmbeddedContent: function renderEmbeddedContent(html) {

      if (!html) {
        return false;
      }

      this.addContent(
          '<div id="plemx-root"></div><a href="http://www.theweathernetwork.com">The Weather Network</a>'
      );

      var _btn = html.match(/plm.push\(\['_btn', (\d+)\]\)/),
          _loc = html.match(/plm.push\(\['_loc','(.+)'\]\);_/),
          _doc = html.match(/\(document, 'script', '(.+)'\)/);

      if (_btn && _loc && _doc) {
        window._plm = window._plm || [];
        _plm.push(['_btn', _btn[1]]);
        _plm.push(['_loc', _loc[1]]);
        _plm.push(['location', document.location.host]);
        (function (d, e, i) {
          if (d.getElementById(i)) return;
          var px = d.createElement(e);
          px.type = 'text/javascript';
          px.async = true;
          px.id = i;
          px.src = ('https:' == d.location.protocol ? 'https:' : 'http:') +
              '//widget.twnmm.com/js/btn/pelm.js?orig=en_ca';
          var s = d.getElementsByTagName('script')[0];
          var py = d.createElement('link');
          py.rel = 'stylesheet'
          py.href = ('https:' == d.location.protocol ? 'https:' : 'http:') +
              '//widget.twnmm.com/styles/btn/styles.css'
          s.parentNode.insertBefore(px, s);
          s.parentNode.insertBefore(py, s);
        })(document, 'script', _doc[1]);

      } else {

        this.vie.scope.logger.warn('Unable fetch instances', _btn, _loc, _doc);
      }
    }

  }, PluginElement.prototype);
});

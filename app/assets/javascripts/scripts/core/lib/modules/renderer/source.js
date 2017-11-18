/**
 * Created by teamco on 7/10/14.
 */

defineP(function defineSourceRenderer() {

  /**
   * Define SourceRenderer
   * @class SourceRenderer
   * @extends AntHill
   * @constructor
   */
  var SourceRenderer = function SourceRenderer() {
  };

  return SourceRenderer.extend('SourceRenderer', {

    /**
     * Render source
     * @memberOf SourceRenderer
     * @extends AntHill
     * @extends BaseElement
     * @param {string} src
     * @param {string} type
     * @param {{monitor, [visible]: boolean}} [opts]
     * @returns {*|jQuery}
     */
    renderSource: function renderSource(src, type, opts) {

      var $source = $(
          '<div class="source"><pre><code class="hljs"></code></pre></div>'),
          $code = $source.find('code');

      try {
        requireP([
          'lib/packages/highlight/vkbeautify',
          'lib/packages/highlight/highlight.pack'
        ], function () {
          $code.text(vkbeautify.xml(src));
          hljs.highlightBlock($code.get(0));
        });

        this.createLinkCss({
          href: '../../assets/scripts/core/lib/packages/highlight/styles/agate.css'
        });

        this.initMonitor($source, opts.monitor);
        this.checkVisibility($source, opts.visible);

      } catch (e) {

        this.view.scope.logger.warn('Unable to render source', e);
      }

      return $source;
    }
  });
});
/**
 * Created by teamco on 7/10/14.
 */

/**
 * @constant SourceRenderer
 * @type {module.SourceRenderer}
 */
module.exports = class SourceRenderer {

  /**
   * Render source
   * @memberOf SourceRenderer
   * @param {string} src
   * @param {string} type
   * @param {{monitor, [visible]: boolean}} [opts]
   * @returns {*|jQuery}
   */
  renderSource(src, type, opts) {

    require('../../packages/highlight/vkbeautify.js');

    /**
     * @constant hljs
     * @type {globalObject.hljs}
     */
    const hljs = require('../../../../../../../../node_modules/highlight.js/lib/index.js');

    const $source = $('<div class="source"><pre><code class="hljs"></code></pre></div>'),
        $code = $source.find('code');

    try {
      $code.text(vkbeautify.xml(src));
      hljs.initHighlightingOnLoad();
      hljs.highlightBlock($code.get(0));

      this.createLinkCss({href: '/assets/scripts/core/lib/packages/highlight/styles/agate.css'});

      this.initMonitor($source, opts.monitor);
      this.checkVisibility($source, opts.visible);

    } catch (e) {
      this.view.scope.logger.warn('Unable to render source', e);
    }

    return $source;
  }
};
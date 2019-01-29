/**
 * Created by teamco on 7/10/14.
 */

/**
 * @constant
 * @type {hljs}
 */
import hljs from 'highlight.js';

/**
 * @constant SourceRenderer
 * @type {SourceRenderer}
 */
export class SourceRenderer {

  /**
   * Render source
   * @memberOf SourceRenderer
   * @param {string} src
   * @param {string} type
   * @param {{monitor, [visible]: boolean}} [opts]
   * @returns {*|jQuery}
   */
  renderSource(src, type, opts) {

    /**
     * @constant
     * @type {vkbeautify}
     */
    const vkbeautify = require('vkbeautify');

    const $source = $('<div class="source"><pre><code class="html hljs"></code></pre></div>'),
        $code = $source.find('code');

    try {
      $code.text(vkbeautify.xml(src));
      hljs.initHighlighting();
      hljs.highlightBlock($code.get(0));

      this.initMonitor($source, opts.monitor);
      this.checkVisibility($source, opts.visible);

    } catch (e) {
      this.view.scope.logger.warn('Unable to render source', e);
    }

    return $source;
  }
}
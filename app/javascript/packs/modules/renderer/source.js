/**
 * Created by teamco on 7/10/14.
 */

import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';

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

    const vkbeautify = require('vkbeautify');

    const $source = $('<div class="source"><pre><code class="hljs"></code></pre></div>'),
        $code = $source.find('code');

    try {
      $code.text(vkbeautify.xml(src));
      hljs.initHighlightingOnLoad();
      hljs.highlightBlock($code.get(0));

      this.initMonitor($source, opts.monitor);
      this.checkVisibility($source, opts.visible);

    } catch (e) {
      this.view.scope.logger.warn('Unable to render source', e);
    }

    return $source;
  }
}
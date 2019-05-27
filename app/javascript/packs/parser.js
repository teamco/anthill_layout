import LZString from 'lz-string';
import {prettyPrint} from './lib/pretty.print';
import {BaseElement} from 'js/modules/Element';

/**
 * @method _handleParser
 * @private
 */
function _handleParser() {
  const script = BaseElement.getQs('script#parser') || {};

  /**
   * @constant
   * @type {*|{compressed, selector}}
   */
  const data = script.dataset || {};
  let content = data.content;
  let parsed = {error: 'Unable to parse content'};

  if (data.compressed === 'true') {
    content = LZString.decompressFromBase64(content);
  }
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error(e);
  }
  $(prettyPrint(parsed)).appendTo(data.selector);
}

document.addEventListener('DOMContentLoaded', _handleParser);
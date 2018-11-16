import LZString from 'lz-string';
import {prettyPrint} from './lib/pretty.print';

/**
 * @method handleParser
 */
function handleParser() {
  const script = document.querySelector('script#parser') || {};
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

document.addEventListener('DOMContentLoaded', () => {
  handleParser();
});
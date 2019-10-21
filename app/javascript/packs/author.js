import {prettyPrint} from 'lib/pretty.print';
import html2canvas from 'html2canvas';
import {setGlobals} from 'js/modules/base/Function';

setGlobals('prettyPrint', prettyPrint);
setGlobals('html2canvas', html2canvas);

require('./rails');
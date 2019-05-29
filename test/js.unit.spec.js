import {jsDocument} from './unit/helpers/document';
import {initReporter} from './unit/helpers/reporter';
import requireHacker from 'require-hacker';

requireHacker.hook('png', () => 'module.exports = ""');

initReporter();

describe('JS Unit tests', () => {

  beforeAll(() => {
  });

  jsDocument(true);

  //require('./unit/application/application.unit');
  //require('./unit/workspace/workspace.unit');
  //require('./unit/page/page.unit');
  //require('./unit/widget/widget.unit');

  require('./unit/flow/flow.unit');
});
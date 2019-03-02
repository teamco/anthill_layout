import {jsDocument} from './unit/helpers/document';
import {initReporter} from './unit/helpers/reporter';

initReporter();

describe('JS Unit tests', () => {

  beforeAll(() => {
  });

  jsDocument();

  //require('./unit/application/application.unit');
  require('./unit/page/page.unit');
});
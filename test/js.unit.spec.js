import {jsDocument} from './unit/helpers/document';

describe('JS Unit tests', () => {

  beforeAll(() => {
  });

  jsDocument();

  //require('./unit/application/application.unit');
  require('./unit/page/page.unit');
});
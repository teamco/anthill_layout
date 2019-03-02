import {Page} from 'config/page';
import {mvcExpectation} from '../helpers/utils';

describe('Page', () => {

  /**
   * @constant
   * @type {Page}
   */
  const page = new Page({});

  mvcExpectation(page);
});
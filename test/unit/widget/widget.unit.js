import {Widget} from 'config/widget';
import {mvcExpectation} from '../helpers/utils';

describe('Widget', () => {

  /**
   * @constant
   * @type {Widget}
   */
  const widget = new Widget({});

  mvcExpectation(widget);
});
import {Page} from 'config/page';
import {mvcExpectation} from '../helpers/utils';

describe('Page', () => {

  const page = new Page({});

  mvcExpectation(page);
});
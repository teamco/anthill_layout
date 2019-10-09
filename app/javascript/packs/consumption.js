require('./rails');

import {Application} from './core/config/application';

document.onreadystatechange = async () => {
  if (document.readyState === 'complete') {
    window.anthill = await Application.init();
  }
};
require.context('../images/', true, /\.(gif|jpg|png|svg)$/i);

import './scss/development.scss';
import './scss/application.scss';
import './scss/jquery-ui.min.scss';
import './combined';

import Rails from 'rails-ujs';
import Turbolinks from 'turbolinks';

import 'babel-polyfill';
import 'bootstrap';

import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import '@coreui/coreui/dist/js/coreui.min';
import '@coreui/coreui-plugin-chartjs-custom-tooltips/dist/js/custom-tooltips.min';
import '@fortawesome/fontawesome-free/js/all.min';

import 'jquery-ui/ui/core';
import 'jquery-ui/ui/labels';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/mouse';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/selectable';
import 'jquery-ui/ui/widgets/sortable';

import 'jquery.initialize';

import {Application} from './core/config/application';

global['Rails'] = Rails;

document.addEventListener('DOMContentLoaded', () => {
  Rails.start();
  Turbolinks.start();
});

document.onreadystatechange = async () => {
  if (document.readyState === 'complete') {
    await Application.init();
  }
};
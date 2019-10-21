require('./rails');

import html2canvas from 'html2canvas';
import './scss/jquery-ui.min.scss';

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

import {setGlobals} from 'js/modules/base/Function';
import {Application} from './core/config/application';

document.onreadystatechange = async () => {
  if (document.readyState === 'complete') {
    setGlobals('html2canvas', html2canvas);
    setGlobals('anthill', await Application.init());
  }
};
/**
 * Created by teamco on 4/1/14.
 */

import {aggregation} from '../../../lib/extends/aggregation';
import {DragSimulate} from './simulate/drag.simulate';
import {ResizeSimulate} from './simulate/resize.simulate';
import {ContentSimulate} from './simulate/content.simulate';
import {SwitchToPageSimulate} from './simulate/switch.to.page.simulate';

/**
 * @class WidgetSubscribe
 * @export {WidgetSubscribe}
 * @extends {ContentSimulate, DragSimulate, ResizeSimulate}
 */
export class WidgetSubscribe extends aggregation(ContentSimulate, DragSimulate, ResizeSimulate,
    SwitchToPageSimulate) {
}
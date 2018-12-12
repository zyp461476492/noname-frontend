/**
 * 部分引入element-ui的弹窗组件
 * @author zyp 
 * @date 2018-12-12
 */
import Vue from 'vue';
import {
    MessageBox
} from "element-ui";

Vue.component(MessageBox.name, MessageBox);
// 注入element-ui
Vue.prototype.$msgbox = MessageBox;
/**
 * 全局过滤器配置
 * @author zyp 
 * @date 2018-12-12
 */
import Vue from 'vue';
import {
    formatDate
} from '@/plugins/dateFormate.js';

// 添加全局过滤器
Vue.filter('formateDate', function (value) {
    let date = new Date(value);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
})
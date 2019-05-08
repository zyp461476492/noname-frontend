/**
 * 通用方法封装js
 */
import {Message} from 'element-ui';

/**
 * 弹出element-ui msg 弹窗
 * @param {string} text 提示消息
 * @param {*} type 弹窗类型 error success warning
 */
export function msg(text, type) {
    Message.closeAll();
    Message({
        message: text,
        type: type
    })
}

/**
 * 判断一个对象是否为空，有问题，待后续修复
 * @param {*} obj
 */
export function isEmptyObject(obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
}

/**
 * 判断 array 是否为空
 * @param array
 * @return {boolean}
 */
export function isEmptyArray(array) {
    if (array === undefined)
        return true;
    return array.length === 0;
}

/**
 * 判断请求的结果是否成功，后续修改
 * @param {*} response
 */
export function ajaxSuccess(response) {
    let code = response.data.code;
    return code === 0;
}

/**
 * 获得当前时间
 */
export function now() {
    return new Date().getTime();
}

/**
 * 构造当前登录人员的菜单树
 */
export function buildMenuTree(menuList) {
    // 将节点转换为树形结构
    let tree = {};
    for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        tree[item.id] = item;
        if (item.parent !== undefined) {
            tree[item.parent.id] = item.parent;
        }
    }
    // 拼装树形数据
    for (let i = 0; i < menuList.length; i++) {
        let obj = menuList[i];
        if (obj.parent !== undefined) {
            let parentId = obj.parent.id;
            if (!tree[parentId].children) {
                tree[parentId].children = []
            }
            tree[parentId].children.push(tree[obj.id]);
        }
    }
    // 从节点中取出数据
    let root = [];
    for (let key in tree) {
        if (tree.hasOwnProperty(key)) {
            let data = tree[key];
            if (data.parent === undefined) {
                root.push(data);
            }
        }
    }
    return root;
}
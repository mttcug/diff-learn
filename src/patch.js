import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
import isSameNode from './isSameNode'

export default function (oldVnode, newVnode) {
    // 判断oldVnode是DOM节点还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // 给虚拟节点生成elem指向的真是dom
    let newDom = newVnode.elem
    if (!newVnode.elem) {
        newDom = createElement(newVnode)
    }
    // 比较新老节点是否是同一个节点
    if (isSameNode(oldVnode, newVnode)) {
        patchVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一个节点，进行暴力拆除添加新节点')
        if (oldVnode.elem && oldVnode.elem.parentNode && newDom) {
            oldVnode.elem.parentNode.insertBefore(newDom, oldVnode.elem)
            oldVnode.elem.parentNode.removeChild(oldVnode.elem)
        }
    }
}

function createElement (vnode) {
    let domNode = document.createElement(vnode.sel)
    // 判断有子节点还是文本
    if (vnode.text && (!vnode.children || !vnode.children.length)) {
        domNode.innerText = vnode.text
        // pivot.parentNode.insertBefore(domNode, pivot)
    } else if (vnode.children && vnode.children.length) {
        // 递归创建子节点
        for (let i=0; i<vnode.children.length; i++) {
            let childrenDom = createElement(vnode.children[i])
            domNode.append(childrenDom)
        }
    }
    vnode.elem = domNode
    return domNode
}

export default createElement
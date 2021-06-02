import updateChildren from './updateChildren'
import createElement from './createElement'


export default function (oldVnode, newVnode) {
    console.log('是同一个节点, 进行精细化比较')
    // 1、判断新旧节点是否是同一个节点
    if (oldVnode === newVnode) {
        console.log('新旧节点是同一个节点')
        return
        // 什么都不做
    }
    // 新节点有text属性
    if (newVnode.text && (!newVnode.children || !newVnode.children.length)) {
        console.log('新节点是text，没有children')
        if (oldVnode.text !== newVnode.text || oldVnode.children) {
            oldVnode.elem.innerText = newVnode.text
        }
    } else {
        console.log('新节点有children')
        // 新节点没有text属性
        // 1、新老节点有childrens属性
        if (oldVnode.children && oldVnode.children.length) {
            console.log('新老节点都有childrens属性', oldVnode.elem, oldVnode, newVnode)
            updateChildren(oldVnode.elem, oldVnode.children, newVnode.children)
        } else {
            console.log('新节点有children 老节点没有')
            oldVnode.elem.innerHTML = ''
            // 2、新节点有children 老节点没有
            for (let i=0; i<newVnode.children.length; i++) {
                let child = newVnode.children[i]
                // const newChildDom = createElement(child)
                const newChildDom = child.elem
                oldVnode.elem.appendChild(newChildDom)
            }
        }
    }
}
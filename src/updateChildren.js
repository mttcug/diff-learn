import isSameNode from './isSameNode'
import patchVnode from './patchVnode'
/**
 * 首先进行节点移动是真是节点的移动， 移动后虚拟节点需要做删除操作，因为下次训话依然比较的是虚拟节点
 */
export default function (parentDom, oldCh, newCh) {
    // 旧前
    let oldPreIndex = 0;
    // 旧后
    let oldAftIndex = oldCh.length-1;
    // 新前
    let newPreIndex = 0;
    // 新后
    let newAftIndex = newCh.length-1;
    // 旧前节点
    let oldSNode = oldCh[oldPreIndex];
    // 旧后节点
    let oldENode = oldCh[oldAftIndex];
    // 新前节点
    let newSNode = newCh[newPreIndex];
    // 新后节点
    let newENode = newCh[newAftIndex];

    while (oldPreIndex <= oldAftIndex && newPreIndex <= newAftIndex) {
        // 新前与旧前
        if (!oldSNode || !oldCh[oldPreIndex]) {
            oldSNode = oldCh[++oldPreIndex]
        } else if (!oldENode || !oldCh[oldAftIndex]) {
            oldENode = oldCh[--oldAftIndex]
        } else if (!newSNode || !newCh[newPreIndex]) {
            newSNode = newCh[++newPreIndex]
        } else if (!newENode || !newCh[newAftIndex]) {
            newENode = newCh[--newAftIndex]
        }else if (isSameNode(newSNode, oldSNode)) {
            console.log('①新前与旧前', newSNode.text, oldSNode.text)
            patchVnode(newSNode, oldSNode)
            oldSNode = oldCh[++oldPreIndex]
            newSNode = newCh[++newPreIndex]
            // 新前与旧后
        } else if (isSameNode(newSNode, oldENode)) {
            console.log('②新前与旧后',  newSNode.text, oldENode.text)
            parentDom.insertBefore(oldENode.elem, oldSNode.elem)
            patchVnode(newSNode, oldENode)
            oldENode = oldCh[--oldAftIndex]
            newSNode = newCh[++newPreIndex]
            // 新后与旧前
        } else if (isSameNode(newENode, oldSNode)) {
            console.log('③新后与旧前', newENode.text, oldSNode.text)
            parentDom.insertBefore(oldSNode.elem, oldENode.elem.nextSibling)
            patchVnode(newENode, oldSNode)
            oldSNode = oldCh[++oldPreIndex]
            newENode = newCh[--newAftIndex]
            // 新后与旧后
        } else if (isSameNode(newENode, oldENode)) {
            console.log('④新后与旧后', newENode.text, oldENode.text)
            patchVnode(newENode, oldENode)
            oldENode = oldCh[--oldAftIndex]
            newENode = newCh[--newAftIndex]
        } else {
            console.log('⑤未匹配到相同的情况下')
            let keyMap = {}
            // 未匹配到相同的情况下
            for (let i=oldPreIndex; i<oldAftIndex; i++){
                if (oldCh[i]) {
                    keyMap[oldCh[i].key] = i
                }
            }
            const target = keyMap[newSNode.key]
            // 如果存在则移动
            if (target!==undefined) {
                console.log('⑤未匹配到相同的情况下-存在-移动', newSNode.text)
                patchVnode(oldCh[target], newSNode)
                parentDom.insertBefore(oldCh[target].elem, oldSNode.elem)
                oldCh[target] = undefined;
            } else {
                console.log('⑤未匹配到相同的情况下-不存在-添加', newSNode.text)
                // 如不存在则新增
                parentDom.insertBefore(newSNode.elem, oldSNode.elem)
            }
            newSNode = newCh[++newPreIndex]
        }
    }
    // 循环结束
    // ①如果循环结束，新节点还有剩余直接添加
    if (newPreIndex <= newAftIndex) {
        console.log('⑥循环完毕-新节点剩余--new--add')
        for (let i=newPreIndex; i<=newAftIndex; i++) {
            console.log('add...', newCh[i].text)
            parentDom.insertBefore(newCh[i].elem, oldSNode.elem)
        }
    }
    // ②如果循环结束，旧节点还有剩余直接删除
    if (oldPreIndex <= oldAftIndex) {
        console.log('⑥循环完毕-旧节点剩余--old--delete')
        for (let i=oldPreIndex; i<=oldAftIndex; i++) {
            if (oldCh[i] && oldCh[i].elem) {
                console.log('delete...', oldCh[i].text, 'index:', i)
                parentDom.removeChild(oldCh[i].elem)
            }
        }
    }
}
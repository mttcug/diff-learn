import vnode from './vnode'

// 三种形态
// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())
function h (sel, data, c) {
    if (arguments.length < 3) {
        throw new Error('参数小于三个') 
    }
    if (typeof c === 'string') {
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        for (let i = 0; i< c.length; i++) {
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('第三个参数错误')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        return vnode(sel, data, c, undefined, undefined)
    }
}

export default h
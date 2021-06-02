
  import h from './src/h'
  import patch from './src/patch'



  // 打印虚拟节点
// 得到盒子和按钮
const container = document.getElementById('app');
const btn = document.getElementById('btn');
  const newVnode1 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'Z' }, 'Z'),
    h('li', { key: 'F' }, 'F'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'U' }, 'U'),
    h('li', { key: 'C' }, 'C')
])
const newVnode = h('ul', {}, [
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'G' }, 'G'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'F' }, 'F')
  ])
  console.log('---**:', newVnode)
// 第一次上树
patch(container, newVnode);


btn.onclick = function () {
    patch(newVnode, newVnode1);
}


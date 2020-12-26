# vue-move-drag

[![version](https://img.shields.io/npm/v/vue-move-drag)](https://npm.js) ![license](https://img.shields.io/github/license/evgo2017/vue-move-drag) [![downloads](https://img.shields.io/npm/dt/vue-move-drag)](<https://www.npmjs.com/package/vue-move-drag> ) [![fork](https://img.shields.io/github/forks/evgo2017/vue-move-drag?style=social)](https://github.com/evgo2017/vue-move-drag)

中文 | [English](./README.md)

移动或拖拽一个 DOM 元素到其他位置。

## Demo 示例

完整的示例：

https://evgo2017.com/repo/vue-move-drag

## Install && Use 安装和使用

```javascript
// npm or yarn
npm install vue-move-drag

// main.js
import vueMoveDrag from 'vue-move-drag'
Vue.use(vueMoveDrag)
```

```vue
// vue
<template>
  <div v-move-drag style="top: 50vh; left: 50vw; height: 100px; width: 100px; background: yellowgreen;z-index: 999;"></div>
</template>

// vue event
<template>
  <div v-move-drag @drag="handleDrag" style="top: 50vh; left: 50vw; height: 100px; width: 100px; background: yellowgreen;z-index: 999;"></div>
</template>
```

## Advantage 优势

* [x] 考虑了 PC 端的 Drag 拖拽，也考虑了移动端的 Move 移动；
* [x] 考虑了页面 Resize 伸缩，DOM 会保持原始的相对坐标值（在 DEMO 页体验）；
* [x] 考虑了边界 Border，DOM 不会移出页面；
* [x] Vue 指令方便使用。

## Notice 注意

1. 组件会为 DOM 添加 draggable 属性，设置其 position 为 fixed。
2. 组件 unbind 后会移除 window resize 事件。

## License

MIT - By evgo2017
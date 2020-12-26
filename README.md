# vue-move-drag

[![version](https://img.shields.io/npm/v/vue-move-drag)](https://npm.js) ![license](https://img.shields.io/github/license/evgo2017/vue-move-drag) [![downloads](https://img.shields.io/npm/dt/vue-move-drag)](<https://www.npmjs.com/package/vue-move-drag> ) [![fork](https://img.shields.io/github/forks/evgo2017/vue-move-drag?style=social)](https://github.com/evgo2017/vue-move-drag)

[中文](./README-CN.md) | English

Move or Drag a DOM to another position.

## Demo

Full Usage Features:

https://evgo2017.com/repo/vue-move-drag

## Install && Use

```javascript
// npm or yarn
npm install vue-move-drag

// main.js
import vue-move-drag from 'vue-move-drag'
Vue.use(vue-move-drag)
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

## Advantage

* [x] PC Drag, Mobile Move; 
* [x] Window Resize, the DOM will keep the original relative coordinate value; (To demo experience)
* [x] Border, the DOM won't be moved out Window;
* [x] Vue directive are easy to use.

## Notice

1. Directive will add draggable property to the DOM, and set its position to fixed.
2. When unbind, directive will remove the resize event from window.

## License

MIT - By evgo2017
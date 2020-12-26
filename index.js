function inserted (el, binding) {
  el.setAttribute('draggable', true)
  el.style.position = 'fixed'

  const origin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  el.addEventListener('drag', handlerDrag)
  el.addEventListener('dragend', handlerDragEnd)
  el.addEventListener('touchmove', handlerTouchMove)
  // unbind 后消除 window resize 事件
  window.addEventListener('resize', handlerResize)
  el._handlerEvents = {
    handlerResize
  }

  setOriginByTarget()
  modifyByElBoundingClientRect(el)

  /* 绑定的事件 */
  function handlerDrag () {
    el.style.opacity = '0'
  }

  function handlerDragEnd (e) {
    el.style.opacity = '1'
    modifyByMouseEvent(e)
  }

  function handlerTouchMove (e) {
    e.preventDefault()
    modifyByMouseEvent(e.touches[0])
  }

  function handlerResize () {
    resize()
  }

  /* 核心方法 */
  function modifyByMouseEvent (e) {
    const { clientX, clientY } = e
    const targetSize = getTargetSize()
    const currentY = clientY - targetSize.hh
    const currentX = clientX - targetSize.hw
    modify({ currentY, currentX })
  }

  function modifyByElBoundingClientRect (el) {
    const { top: currentY, left: currentX } = el.getBoundingClientRect()
    modify({ currentY, currentX })
  }

  function modify ({ currentX, currentY }) {
    // 传入的 currentX 和 currentY 是计算后的 left 和 top
    // 这个方法再对值进行边界判断
    const { minY, maxX, maxY, minX } = getBorder()

    const top = Math.min(Math.max(minY, currentY), maxY)
    const left = Math.min(Math.max(minX, currentX), maxX)

    el.style.top = `${top}px`
    el.style.left = `${left}px`
    // 定位以 top 和 left 为准
    // 如果四个值都有且right和bottom都为初始值，则会形成一个更大的矩形，占据更多位置
    el.style.right = ''
    el.style.bottom = ''

    setOriginByTarget()
  }

  function resize () {
    const { top: cTop, right: cRight, bottom: cBottom, left: cLeft } = getTargetRect()
    const { top: oTop, right: oRight, bottom: oBottom, left: oLeft } = origin

    if (cTop > cBottom) {
      if (cTop !== oTop || cBottom !== oBottom) {
        el.style.top = `${oTop + cBottom - oBottom}px`
      }
    }
    if (cLeft > cRight) {
      if (cRight !== oRight || cLeft !== oLeft) {
        el.style.left = `${oLeft + cRight - oRight}px`
      }
    }

    setOriginByTarget()
  }

  function setOriginByTarget () {
    const { top, left, bottom, right } = getTargetRect()
    Object.assign(origin, { top, left, bottom, right })
  }

  /* 获取数据 */
  function getTargetSize () {
    const { offsetWidth: w, offsetHeight: h } = el
    return {
      w, // full width
      hw: w / 2, // half width
      h, // full height
      hh: h / 2 // half height
    }
  }

  function getBorder () {
    const targetSize = getTargetSize()
    const scrollBar = getScrollBar()
    return {
      minY: 0,
      maxX: window.innerWidth - targetSize.w - scrollBar.w,
      maxY: window.innerHeight - targetSize.h - scrollBar.h,
      minX: 0
    }
  }

  function getScrollBar () {
    return {
      w: window.innerWidth - document.scrollingElement.clientWidth,
      h: window.innerHeight - document.scrollingElement.clientHeight
    }
  }

  function getTargetRect () {
    const { top, left, bottom, right } = el.getBoundingClientRect()
    return {
      top,
      right: document.documentElement.clientWidth - right,
      bottom: document.documentElement.clientHeight - bottom,
      left
    }
  }
}

function unbind (el) {
  if (!el._handlerEvents) {
    return
  }
  const { handlerResize } = el._handlerEvents
  window.removeEventListener('resize', handlerResize)
  delete el._handlerEvents
}

const directive = {
  inserted,
  unbind
}

export default {
  install: function (Vue) {
    Vue.directive('move-drag', directive)
  },
  directive: directive
}

// イベント間引き処理
export const throttle = (fn, interval) => {
  let lastTime = Date.now() - interval
  return function() {
    if ((lastTime + interval) < Date.now()) {
      lastTime = Date.now()
      fn()
    }
  }
}

// メニュー開閉時のアニメーション
export const animTiming = {
  duration: 150,
  easing: 'linear'
}

export const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
]

export const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
]

// イベント間引き処理
export const throttle = (fn, arg, interval) => {
  let lastTime = Date.now() - interval
  return function() {
    if ((lastTime + interval) < Date.now()) {
      lastTime = Date.now()
      fn(arg)
    }
  }
}

// メニュー開閉時のアニメーション
const animTiming = {
  duration: 150,
  easing: 'linear'
}

const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
]

const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
]

export function openMenu(content) {
  menu.setAttribute('open', 'true')
  content.classList.add('flex')
  content.classList.remove('hidden')
  content.animate(openingAnimKeyframes(content), animTiming)
}

export function closeMenu(content) {
  const closingAnim = content.animate(closingAnimKeyframes(content), animTiming)
  menu.removeAttribute('open')
  closingAnim.onfinish = () => {
    content.classList.add('hidden')
    content.classList.remove('flex')
  }
}

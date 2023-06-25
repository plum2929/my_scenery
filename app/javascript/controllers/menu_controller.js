import { Controller } from "@hotwired/stimulus"
import { throttle, animTiming, closingAnimKeyframes, openingAnimKeyframes } from "./menu"

// Connects to data-controller="menu"
export default class extends Controller {
  static targets = ['menu', 'content']

  connect() {
    const menu = this.menuTarget
    const content = this.contentTarget

    function closeMenu() {
      const closingAnim = content.animate(closingAnimKeyframes(content), animTiming)
      menu.removeAttribute('open')
      closingAnim.onfinish = () => {
        content.classList.add('hidden')
        content.classList.remove('flex')
      }
    }

    menu.addEventListener('click', () => {
      const open = document.querySelector('[open="true"]')

      if(open !== null) {
        window.addEventListener('scroll', throttle(closeMenu, 1000))
      }
    })
  }

  clickMenuBtn() {
    const menu = this.menuTarget
    const content = this.contentTarget
    const open = document.querySelector('[open="true"]')

    if(open !== null) {
      const closingAnim = content.animate(closingAnimKeyframes(content), animTiming)
      menu.removeAttribute('open')
      closingAnim.onfinish = () => {
        content.classList.add('hidden')
        content.classList.remove('flex')
      }
    } else {
      menu.setAttribute('open', 'true')
      content.classList.add('flex')
      content.classList.remove('hidden')
      content.animate(openingAnimKeyframes(content), animTiming)
    }
  }

  clickDocument(e) {
    const menu = this.menuTarget
    const content = this.contentTarget
    const open = document.querySelector('[open="true"]')

    if(open !== null && !e.target.closest('#menu')) {
      const closingAnim = content.animate(closingAnimKeyframes(content), animTiming)
      menu.removeAttribute('open')
      closingAnim.onfinish = () => {
        content.classList.add('hidden')
        content.classList.remove('flex')
      }
    }
  }
}

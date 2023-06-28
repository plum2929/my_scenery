import { Controller } from "@hotwired/stimulus"
import { throttle, openMenu, closeMenu } from "./menu"

// Connects to data-controller="menu"
export default class extends Controller {
  static targets = ['menu', 'content']

  connect() {
    const menu = this.menuTarget
    const content = this.contentTarget

    menu.addEventListener('click', () => {
      const open = document.querySelector('[open="true"]')

      if(open !== null) {
        window.addEventListener('scroll', throttle(closeMenu, content, 1000))
      }
    })
  }

  clickMenuBtn() {
    const content = this.contentTarget
    const open = document.querySelector('[open="true"]')

    if(open !== null) {
      closeMenu(content)
    } else {
      openMenu(content)
    }
  }

  clickDocument(e) {
    const content = this.contentTarget
    const open = document.querySelector('[open="true"]')

    if(open !== null && !e.target.closest('#menu')) {
      closeMenu(content)
    }
  }
}

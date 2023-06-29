import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="header"
export default class extends Controller {
  static targets = ['header']

  connect() {
    const header = this.headerTarget
    const container = document.getElementsByClassName('container')[0]
    let headerHeight = header.offsetHeight
    let scrollPoint = 0
    let lastPoint = 0

    window.addEventListener('resize', () => {
      headerHeight = header.offsetHeight
    })

    window.addEventListener("scroll", () => {
      scrollPoint = window.scrollY

      if(scrollPoint < headerHeight && scrollPoint > lastPoint) {
        header.classList.remove('fixed-hide','fixed', 'top-0')
        container.style.marginTop = 0
      }else{
        if(scrollPoint > lastPoint) {
          header.classList.add('fixed-hide', 'fixed', 'top-0')
          container.style.marginTop = `${headerHeight}px`
        }else{
          header.classList.add('fixed', 'top-0')
          header.classList.remove('fixed-hide')
          container.style.marginTop = `${headerHeight}px`
        }
      }
      lastPoint = scrollPoint
    })
  }
}

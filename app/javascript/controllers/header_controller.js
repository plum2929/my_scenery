import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="header"
export default class extends Controller {
  static targets = ['header']

  connect() {
    const header = this.headerTarget
    const headerHeight = header.offsetHeight
    const container = document.getElementsByClassName('container')[0]
    let scrollPoint = 0
    let lastPoint = 0

    window.addEventListener("scroll", () => {
      scrollPoint = window.scrollY

      if (scrollPoint < headerHeight) {
        header.classList.remove('fixed-hide','fixed', 'top-0')
        container.classList.remove(`mt-[${headerHeight}px]`)
        if (scrollPoint < lastPoint) {
          header.classList.add('fixed', 'top-0')
          header.classList.remove('fixed-hide')
          container.classList.add(`mt-[${headerHeight}px]`)
        }
      }else{
        if(scrollPoint > lastPoint){
          header.classList.add('fixed-hide', 'fixed', 'top-0')
          container.classList.add(`mt-[${headerHeight}px]`)
        }else{
          header.classList.add('fixed', 'top-0')
          header.classList.remove('fixed-hide')
          container.classList.add(`mt-[${headerHeight}px]`)
        }
      }
      lastPoint = scrollPoint
    })
  }
}

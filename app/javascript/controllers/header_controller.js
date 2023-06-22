import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="header"
export default class extends Controller {
  static targets = ['header']

  connect() {
    const header = this.headerTarget
    const headerHeight = header.offsetHeight
    const container = document.getElementsByClassName('container')[0]
    let margin_top = ''
    let scrollPoint = 0
    let lastPoint = 0

    if (headerHeight === 48) {
      margin_top = 'mt-12'
    }else if (headerHeight === 56) {
      margin_top = 'mt-14'
    }

    window.addEventListener("scroll", () => {
      scrollPoint = window.scrollY

      if (scrollPoint < headerHeight) {
        header.classList.remove('fixed-hide','fixed', 'top-0')
        container.classList.remove(margin_top)
        if (scrollPoint < lastPoint) {
          header.classList.add('fixed', 'top-0')
          header.classList.remove('fixed-hide')
          container.classList.add(margin_top)
        }
      }else{
        if(scrollPoint > lastPoint){
          header.classList.add('fixed-hide', 'fixed', 'top-0')
          container.classList.add(margin_top)
        }else{
          header.classList.add('fixed', 'top-0')
          header.classList.remove('fixed-hide')
          container.classList.add(margin_top)
        }
      }
      lastPoint = scrollPoint
    })
  }
}

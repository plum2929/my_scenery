import { Controller } from "@hotwired/stimulus"
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

// Connects to data-controller="masonry_layout"
export default class extends Controller {

  connect() {
    const photos = document.querySelector('#photos')
    const width = window.outerWidth
    const sp = 768

    if (width >= sp) {
      imagesLoaded(photos, () => {
        new Masonry(photos, {
          itemSelector: '.photo',
          columnWidth: '.photo',
          percentPosition: true,
          fitWidth: true,
          gutter: 20
        })
      })
    }
  }

  resize() {
    const masonry = new Masonry(photos, {
      itemSelector: '.photo',
      columnWidth: '.photo',
      percentPosition: true,
      fitWidth: true,
      gutter: 20
    })

    function masonry_execute() {
      const width = window.outerWidth
      const sp = 768

      if (width < sp) {
        masonry.destroy()
      } else {
        imagesLoaded(photos, () => {
          masonry
        })
      }
    }
    masonry_execute()
  }
}

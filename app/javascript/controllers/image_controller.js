import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="image"
export default class extends Controller {
  static targets = ['select', 'preview']

  imagePreview() {
    const file = this.selectTarget.files[0]
    const preview = this.previewTarget
    const reader = new FileReader()

    reader.onload = () => preview.src = reader.result

    if(file) {
      reader.readAsDataURL(file)
    }
  }
}

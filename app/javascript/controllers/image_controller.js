import { Controller } from "@hotwired/stimulus"
import { addFieldInvalidToClassList, changeDisabledStatusSubmitBtn, checkBlank } from './form_validation'

// Connects to data-controller="image"
export default class extends Controller {
  static targets = ['select', 'preview', 'submit']

  connect() {
    const select = this.selectTarget
    const submitBtn = this.submitTarget

    addFieldInvalidToClassList([select])

    select.addEventListener('change', () => {
      checkBlank(select)
      changeDisabledStatusSubmitBtn(submitBtn)
    })
  }

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

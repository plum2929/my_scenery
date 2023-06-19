import { Controller } from "@hotwired/stimulus"
import { addFieldInvalidToClassList, changeDisabledStatusSubmitBtn, checkBlank } from './form_validation'

// Connects to data-controller="login"
export default class extends Controller {
  static targets = ['email', 'password', 'submit']

  connect() {
    const emailInput = this.emailTarget
    const passwordInput = this.passwordTarget
    const submitBtn = this.submitTarget
    const inputs = [emailInput, passwordInput]

    addFieldInvalidToClassList(inputs)

    emailInput.addEventListener('input', () => {
      checkBlank(emailInput)
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    passwordInput.addEventListener('input', () => {
      checkBlank(passwordInput)
      changeDisabledStatusSubmitBtn(submitBtn)
    })
  }
}

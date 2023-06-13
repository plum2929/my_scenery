import { Controller } from "@hotwired/stimulus"
import { addFieldInvalidToClassList, changeDisabledStatusSubmitBtn, checkBlank } from './form_validation'

// Connects to data-controller="login"
export default class extends Controller {
  static targets = ['email', 'password', 'submit', 'error_email', 'error_password']

  connect() {
    const emailInput = this.emailTarget
    const passwordInput = this.passwordTarget
    const submitBtn = this.submitTarget
    const emailError = this.error_emailTarget
    const passwordError = this.error_passwordTarget
    const inputs = [emailInput, passwordInput]

    addFieldInvalidToClassList(inputs)

    emailInput.addEventListener('blur', () => {
      checkBlank(emailInput, emailError, 'メールアドレスを入力してください')
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    emailInput.addEventListener('input', () => {
      checkBlank(emailInput, emailError, 'メールアドレスを入力してください')
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    passwordInput.addEventListener('blur', () => {
      checkBlank(passwordInput, passwordError, 'パスワードを入力してください')
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    passwordInput.addEventListener('input', () => {
      checkBlank(passwordInput, passwordError, 'パスワードを入力してください')
      changeDisabledStatusSubmitBtn(submitBtn)
    })
  }
}

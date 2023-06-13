import { Controller } from '@hotwired/stimulus'
import { addFieldInvalidToClassList,
          changeDisabledStatusSubmitBtn,
          showErrorMessage,
          nameValidation,
          emailValidation,
          passwordValidation,
          confirmationValidation
        } from './form_validation'

// Connects to data-controller='signup'
export default class extends Controller {
  static targets = [
                    'name',
                    'email',
                    'password',
                    'password_confirmation',
                    'submit',
                    'error_name',
                    'error_email',
                    'error_password',
                    'error_password_confirmation'
                    ]

  connect() {
    const nameInput = this.nameTarget
    const emailInput = this.emailTarget
    const passwordInput = this.passwordTarget
    const confirmationInput = this.password_confirmationTarget
    const submitBtn = this.submitTarget
    const nameError = this.error_nameTarget
    const emailError = this.error_emailTarget
    const passwordError = this.error_passwordTarget
    const confirmationError = this.error_password_confirmationTarget
    const inputs = [nameInput, emailInput, passwordInput, confirmationInput]
    const emailRegex = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i

    addFieldInvalidToClassList(inputs)

    nameInput.addEventListener('blur', () => {
      nameValidation(nameInput, nameError)
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    nameInput.addEventListener('input', () => {
      nameValidation(nameInput, nameError)
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    emailInput.addEventListener('blur', () => {
      emailValidation(emailInput, emailError, emailRegex)
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    emailInput.addEventListener('input', () => {
      if((emailError.textContent !== '')){
        emailValidation(emailInput, emailError, emailRegex)
        changeDisabledStatusSubmitBtn(submitBtn)
      }else if(emailRegex.test(emailInput.value)) {
        emailValidation(emailInput, emailError, emailRegex)
        changeDisabledStatusSubmitBtn(submitBtn)
      }
    })

    passwordInput.addEventListener('blur', () => {
      passwordValidation(passwordInput, passwordError, confirmationInput, confirmationError)
      changeDisabledStatusSubmitBtn(submitBtn)
    })

    passwordInput.addEventListener('input', () => {
      if((passwordError.textContent !== '') || (confirmationError.textContent !== '')){
        passwordValidation(passwordInput, passwordError, confirmationInput, confirmationError)
        changeDisabledStatusSubmitBtn(submitBtn)
      }
    })

    confirmationInput.addEventListener('blur', () => {
      if(passwordError.textContent === ''){
        confirmationValidation(passwordInput, confirmationInput, confirmationError)
        changeDisabledStatusSubmitBtn(submitBtn)
      }
    })

    confirmationInput.addEventListener('input', () => {
      if((confirmationInput.value.length === passwordInput.value.length)
          || (confirmationError.textContent !== ''
          && confirmationError.classList.contains('field-invalid')
        )
      ){
        confirmationValidation(passwordInput, confirmationInput, confirmationError)
        changeDisabledStatusSubmitBtn(submitBtn)
      }
    })

    confirmationInput.addEventListener('focus', () => {
      if(passwordInput.value.trim().length < 8){
        showErrorMessage(passwordInput, passwordError, '8文字以上で入力してください')
      }
    })
  }
}

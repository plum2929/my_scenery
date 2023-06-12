import { Controller } from '@hotwired/stimulus'

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

    const showErrorMessage = (input, error, message) => {
      input.classList.add('field-invalid', 'border-1','border-error','bg-rose-100')

      error.classList.add('field-invalid', 'text-sm', 'text-error', 'mt-2', 'ml-2')
      error.textContent = message
    }

    const removeErrorMessage = (input, error) => {
      input.classList.remove('field-invalid', 'border-1','border-error','bg-rose-100')

      if(error.textContent !== '' && error.classList.contains('field-invalid')){
        error.textContent = ''
        error.classList.remove('field-invalid')
      }
    }

    const nameValidation = (input, error) => {
      if(input.value.trim() === ''){
        showErrorMessage(input, error, 'ユーザー名を入力してください')
      }else if(input.value.length > 20){
        showErrorMessage(input, error, 'ユーザー名は20文字以内で入力してください')
      }else{
        removeErrorMessage(input, error)
      }
    }

    const emailValidation = (input, error, regex) => {
      if(input.value.trim() === ''){
        showErrorMessage(input, error, 'メールアドレスを入力してください')
      }else if(!regex.test(input.value)){
        showErrorMessage(input, error, '有効なメールアドレスを入力してください')
      }else{
        removeErrorMessage(input, error)
      }
    }

    const passwordValidation = (passwordInput, passwordError, confirmationInput, confirmationError) => {
      if(passwordInput.value.trim().length < 8){
        showErrorMessage(passwordInput, passwordError, '8文字以上で入力してください')
      }else if((confirmationInput.value !== '') && (passwordInput.value !== confirmationInput.value)){
        removeErrorMessage(passwordInput, passwordError)
        showErrorMessage(confirmationInput, confirmationError, '入力したパスワードと一致しません')
      }else if(passwordInput.value === confirmationInput.value){
        removeErrorMessage(passwordInput, passwordError)
        removeErrorMessage(confirmationInput, confirmationError)
      }else{
        removeErrorMessage(passwordInput, passwordError)
      }
    }

    const confirmationValidation = (passwordInput, confirmationInput, error) => {
      if(confirmationInput.value.trim() === ''){
        showErrorMessage(confirmationInput, error, 'パスワード(確認)を入力してください')
      }else if(passwordInput.value === confirmationInput.value){
        removeErrorMessage(confirmationInput, error)
      }else{
        showErrorMessage(confirmationInput, error, '入力したパスワードと一致しません')
      }
    }

    const invalidSelector = document.getElementsByClassName('field-invalid');
    const changeDisabledStatusSubmitBtn = (submitBtn) => submitBtn.disabled = invalidSelector.length > 0;


    inputs.forEach((input) => {
      if(input.value === '') {
        input.classList.add('field-invalid')
      }
    })

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

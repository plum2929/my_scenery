export const addFieldInvalidToClassList = (inputs) => {
  inputs.forEach((input) => {
    if(input.value === '') {
      input.classList.add('field-invalid')
    }
  })
}

const invalidSelector = document.getElementsByClassName('field-invalid');
export const changeDisabledStatusSubmitBtn = (submitBtn) => submitBtn.disabled = invalidSelector.length > 0;

export const showErrorMessage = (input, error, message) => {
  input.classList.add('field-invalid', 'border-1','border-error','bg-rose-100')

  error.classList.add('field-invalid', 'text-sm', 'text-error', 'mt-2', 'ml-2')
  error.textContent = message
}

export const removeErrorMessage = (input, error) => {
  input.classList.remove('field-invalid', 'border-1','border-error','bg-rose-100')

  if(error.textContent !== '' && error.classList.contains('field-invalid')){
    error.textContent = ''
    error.classList.remove('field-invalid')
  }
}

export const nameValidation = (input, error) => {
  if(input.value.trim() === ''){
    showErrorMessage(input, error, 'ユーザー名を入力してください')
  }else if(input.value.length > 20){
    showErrorMessage(input, error, 'ユーザー名は20文字以内で入力してください')
  }else{
    removeErrorMessage(input, error)
  }
}

export const emailValidation = (input, error, regex) => {
  if(input.value.trim() === ''){
    showErrorMessage(input, error, 'メールアドレスを入力してください')
  }else if(!regex.test(input.value)){
    showErrorMessage(input, error, '有効なメールアドレスを入力してください')
  }else{
    removeErrorMessage(input, error)
  }
}

export const passwordValidation = (passwordInput, passwordError, confirmationInput, confirmationError) => {
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

export const confirmationValidation = (passwordInput, confirmationInput, error) => {
  if(confirmationInput.value.trim() === ''){
    showErrorMessage(confirmationInput, error, 'パスワード(確認)を入力してください')
  }else if(passwordInput.value === confirmationInput.value){
    removeErrorMessage(confirmationInput, error)
  }else{
    showErrorMessage(confirmationInput, error, '入力したパスワードと一致しません')
  }
}

export const checkBlank = (input) => {
  if(input.value.trim() === ''){
    input.classList.add('field-invalid')
  }else{
    input.classList.remove('field-invalid')
  }
}

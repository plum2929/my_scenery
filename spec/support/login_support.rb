module LoginSupport
  def login_as(user)
    visit login_path
    fill_in I18n.t('activerecord.attributes.user.email'), with: user.email
    fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
    click_button I18n.t('defaults.login')
  end
end

module ApplicationHelper
  include Pagy::Frontend

  def page_title(page_title = '')
    base_title = t('defaults.title')

    page_title.empty? ? base_title : "#{page_title} | #{base_title}"
  end
end

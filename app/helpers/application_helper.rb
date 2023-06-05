module ApplicationHelper
  def page_title(page_title = '')
    base_title = 'MyScenery'

    page_title.empty? ? base_title : "#{page_title} | #{base_title}"
  end
end

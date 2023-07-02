import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tag"
export default class extends Controller {
  static targets = ['tag_input', 'all_tags', 'tag_names']

  connect() {
    const tagInput = this.tag_inputTarget
    const allTags = this.all_tagsTarget.getAttribute('value')
    const allTagsList = JSON.parse(allTags).map(v => v.name)

    const tagify = new Tagify(tagInput, {
      whitelist: allTagsList,
      dropdown: {
        maxItems: 15,
        classname: 'suggestion',
        enabled: 0,
        closeOnSelect: false,
      },
      templates: {
        dropdownFooter(suggestions){
          var hasMore = suggestions.length - this.settings.dropdown.maxItems;

          return hasMore > 0
            ? `<footer data-selector='tagify-suggestions-footer' class="${this.settings.classNames.dropdownFooter}">
                あと${hasMore}件の候補があります。
              </footer>`
            : '';
        }
      }
    })

    tagify.on('add', e => this.saveTagNames(e.detail.tagify))
    tagify.on('remove', e => this.saveTagNames(e.detail.tagify))

    const tagNamesStr = this.tag_namesTarget.value
    if (tagNamesStr.length > 0) {
      tagify.addTags(tagNamesStr.split(','))
    }
  }

  saveTagNames(tagify) {
    this.tag_namesTarget.value = tagify.value.map(v => v.value)
  }
}

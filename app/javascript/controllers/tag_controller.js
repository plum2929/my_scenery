import { Controller } from "@hotwired/stimulus"
import Tagify from '@yaireo/tagify'

// Connects to data-controller="tag"
export default class extends Controller {
  static targets = ['tag_input', 'tag_names']

  connect() {
    const tagInput = this.tag_inputTarget

    const tagify = new Tagify(tagInput)

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

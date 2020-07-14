
import Vue from 'vue'

const handleOutsideClick = {}

function hasSomeParentTheClass (element, classname) {
  if (element.className === undefined) return
  if (element.className.split(' ').indexOf(classname) >= 0) return true
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
}

export default Vue.directive('outsideClick', {
  // this directive is run on the bind and unbind hooks
  bind (el, binding) {
    // Define the function to be called on click, filter the excludes and call the handler
    handleOutsideClick[el.id] = e => {
      e.stopPropagation()
      // extract the handler and exclude from the binding value
      const { handler, exclude } = binding.value
      // set variable to keep track of if the clicked element is in the exclude list
      let clickedOnExcludedEl = false
      // if the target element has no classes, it won't be in the exclude list skip the check

      // for each exclude name check if it matches any of the target element's classes
      for (const className of exclude) {
        clickedOnExcludedEl = hasSomeParentTheClass(e.target, className)
        if (clickedOnExcludedEl) {
          break // once we have found one match, stop looking
        }
      }

      // don't call the handler if our directive element contains the target element
      // or if the element was in the exclude list
      if (!(el.contains(e.target) || clickedOnExcludedEl)) {
        handler()
      }
    }
    // Register our outsideClick handler on the click/touchstart listeners
    document.addEventListener('click', handleOutsideClick[el.id])
    document.addEventListener('touchstart', handleOutsideClick[el.id])
    document.onkeydown = e => {
      // this is an option but may not work right with multiple handlers
      if (e.keyCode === 27) {
        // TODO: there are minor issues when escape is clicked right after open keeping the old target
        handleOutsideClick[el.id](e)
      }
    }
  },
  unbind (el) {
    // If the element that has v-outside-click is removed, unbind it from listeners
    document.removeEventListener('click', handleOutsideClick[el.id])
    document.removeEventListener('touchstart', handleOutsideClick[el.id])
    document.onkeydown = null // Note that this may not work with multiple listeners
  }
})

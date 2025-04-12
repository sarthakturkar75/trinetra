window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('variantChange', ({ detail }) => {
    const variant = detail.variant
    const swellPoints = document.querySelector(
      '.product-form .swell-product-helper'
    )

    if (!variant || !swellPoints) {
      return
    }

    swellPoints.innerHTML = variant.price / 100
  })
})

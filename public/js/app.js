const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const primaryParagraph = document.querySelector('#message-1')
const secondaryParagraph = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const address = searchField.value

  primaryParagraph.textContent = 'Loading...'
  secondaryParagraph.textContent = ''

  fetch(`/weather?address=${ address }`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        primaryParagraph.textContent = data.error
        return
      }

      primaryParagraph.textContent = data.location
      secondaryParagraph.textContent = data.forecast
    })
  })
})
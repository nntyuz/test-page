const form = document.querySelector('.form')
const email = document.querySelector('input[name="email"]')
const tel = document.querySelector('input[name="tel"]')
const man = document.querySelector('input[value="man"]')
const woman = document.querySelector('input[value="woman"]')
const age = document.querySelector('input[name="number"]')
const success = document.querySelector('.success')

let hasErrors = false

function getValues () {
  return {
     emailValue: email.value,
     telValue: tel.value,
     manValue: man.checked,
     womanValue: woman.checked,
     ageValue: age.value,
  }
}

function submit (e) {
  e.preventDefault()

  validate()

  if (hasErrors) {
    return
  }

  sendForm()
}

function validate () {
  const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const { emailValue, telValue, manValue, womanValue, ageValue } = getValues()

  hasErrors = false
  clearErrors()

  if (!emailValue) {
    email.classList.add('error')
    hasErrors = true
  }
  if (!telValue) {
    tel.classList.add('error')
    hasErrors = true
  }
  if (manValue && !ageValue) {
    age.classList.add('error')
    hasErrors = true
  }

  if (!regexp.test(emailValue)) {
    email.classList.add('error')
    hasErrors = true
  }

  if (telValue) {
    const firstCheck = telValue.length === 11 && String(telValue[0]) === '8'
    const secondCheck = telValue.length === 12 && String(telValue[0]) === '+' && String(telValue[1]) === '7'
    if (!firstCheck && !secondCheck) {
      tel.classList.add('error')
      hasErrors = true
    }
  }
  if (manValue) {
    if (!(Number(ageValue) >= 18 && Number(ageValue) < 65)) {
      age.classList.add('error')
      hasErrors = true
    }
  }
}

function clearErrors () {
  email.classList.remove('error')
  tel.classList.remove('error')
  age.classList.remove('error')
}

function sendForm (params) {
  const { emailValue, telValue, manValue, womanValue, ageValue } = getValues()
  const result = {
    email: emailValue,
    tel: telValue,
  }

  if (manValue) {
    result.sex = 'man'
    result.age = ageValue
  } else if (womanValue) {
    result.sex = 'woman'
  }

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const entries = urlParams.entries();

  for (const entry of entries) {
    result[entry[0]] = entry[1]
  }

  fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  }).then(res => {
    success.classList.add('active')
    setTimeout(() => {
      closeModal()
    }, 3000)
  })
  .catch((err) => {
    // Error
    console.warn('Something went wrong.', err);
  })
}

function closeModal () {
  email.value = ''
  tel.value = ''
  man.checked = ''
  woman.checked = ''
  age.value = ''

  modal.classList.remove('active')
  overlay.classList.remove('active')
  success.classList.remove('active')
}

form.addEventListener('change', function(e){
  clearErrors()
  if (man.checked) {
    age.classList.remove('hide')
  } else {
    age.classList.add('hide')
  }
})

form.addEventListener('submit', submit)

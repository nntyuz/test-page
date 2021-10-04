const disableBodyScroll = bodyScrollLock.disableBodyScroll
const enableBodyScroll = bodyScrollLock.enableBodyScroll

const modalButton = document.querySelector('.footer-button')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

const headerButton = document.querySelector('.header-button')
const menu = document.querySelector('.menu-container')

function openModal () {
  modal.classList.add('active')
  overlay.classList.add('active')
  disableBodyScroll(menu)
}

function toggleMenu () {
  menu.classList.toggle('open')
  if(menu.classList.contains('open')) {
    overlay.classList.add('active')
    disableBodyScroll(menu)
  }
}

function overlayClick() {
  modal.classList.remove('active')
  menu.classList.remove('open')
  overlay.classList.remove('active')
  enableBodyScroll(menu)
}

modalButton.addEventListener('click', openModal)
overlay.addEventListener('click', overlayClick)
headerButton.addEventListener('click', toggleMenu)

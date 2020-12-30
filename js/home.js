const switcher = document.querySelector('.switcher')
const ion_icon = document.querySelector('.moon ion-icon')
const body = document.querySelector('body')

// functions
function changeMood(e) {
    if (body.classList.contains('light_mode')) {
        body.classList.remove('light_mode')
        ion_icon.setAttribute('name', 'moon')
    } else {
        body.classList.add('light_mode')
        ion_icon.setAttribute('name', 'moon-outline')

    }
}

switcher.addEventListener('click', changeMood)
const switcher = document.querySelector('.switcher')
const ion_icon = document.querySelector('.moon ion-icon')
const body = document.querySelector('body')
const filter_box = document.querySelector('.filter_box')
const region_category = document.querySelector('.category')
const countries_cont = document.querySelector('.countries')
const load_btn = document.querySelector('.load')
const searchInput = document.querySelector('.search_form input')
const searchForm = document.querySelector('.search_form')

// UI class
class Card {
    constructor(card_obj) {
        this.country = card_obj
    }
    createHTML() {
        const html = `<div class="card">
                    <div class="flag">
                        <img src="${this.country.flag}" alt="">
                    </div>
                    <div class="card_info">
                        <h2><a href="/detail.html?country=${this.country.name}">${this.country.name}</a> </h2>
                        <h3>Population : <span>${this.country.population}</span> </h3>
                        <h3>Region: <span>${this.country.region}</span> </h3>
                        <h3>Capital: <span>${this.country.capital}</span> </h3>
                    </div>
                </div>`
        return html
    }
    injectCard() {
        const hmtl = this.createHTML()
        countries_cont.innerHTML += hmtl
    }
}

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

function changeRegion(e) {
    if (region_category.style.display == 'block') {
        region_category.style.display = 'none'
    } else {
        region_category.style.display = 'block'
    }
}

function chooseRegion(e) {
    if (e.target.tagName === 'LI') {
        const country = fetchRegionCountry(e.target.textContent)

        countries_cont.innerHTML = ''

        country.then(data => {

            loadMore()
            load_btn.addEventListener('click', loadMore)
        }).catch(error => {
            console.log(error)
        })
    }

}

function loadMore() {
    const start = document.querySelectorAll('.countries .card').length
    const end = start + 6
    const country_data = data.slice(start, end)
    country_data.forEach(country => {
        const countryCard = new Card(country)
        countryCard.injectCard()
    })
    if (end > data.length) {
        console.log(data.length, end)
        load_btn.setAttribute('disabled', 'true')
        load_btn.textContent = 'No more data'
        load_btn.style.cursor = 'not-allowed'
    }
}

function searchCountryName(e) {

    const country = fetchCountryByTerm(e.target.value)

    countries_cont.innerHTML = ''

    country.then(response => {
        if (response.status) {
            const data = response.data
            loadMore()
            load_btn.addEventListener('click', loadMore)
            countries_cont.style.justifyContent = 'space-between'
            countries_cont.style.alignItems = 'center'
            countries_cont.style.marginBottom = 'auto'
            load_btn.style.display = 'block'
        } else {
            countries_cont.innerHTML = `<h1 style='font-size:2rem;'>No country found with name "${e.target.value}"</h1>`
            countries_cont.style.justifyContent = 'center'
            countries_cont.style.alignItems = 'center'
            countries_cont.style.marginBottom = '5%'
            load_btn.style.display = 'none'
        }

    }).catch(error => {
        console.log(error)
    })
}



// API stuff
async function fetchCountries() {
    response = await fetch('https://restcountries.eu/rest/v2/all')
    data = await response.json()
    return data
}

const country = fetchCountries()

country.then(data => {

    loadMore()
    load_btn.addEventListener('click', loadMore)
}).catch(error => {
    console.log(error)
})

async function fetchRegionCountry(region) {
    response = await fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    data = await response.json()
    return data
}

async function fetchCountryByTerm(term) {
    if (term.length) {
        response = await fetch(`https://restcountries.eu/rest/v2/name/${term}`)
        data = await response.json()
        const status = response.ok
        return { data, status }
    } else {

        country_data = await fetchCountries()

        return { data: country_data, status: true }




    }

}

// event listeners
switcher.addEventListener('click', changeMood)

filter_box.addEventListener('click', changeRegion)

region_category.addEventListener('click', chooseRegion)

searchInput.addEventListener('keydown', searchCountryName)

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    searchForm.reset()

})
const country_name = document.querySelector('.name')
const country_native = document.querySelector('.native span')
const country_pop = document.querySelector('.pop span')
const country_region = document.querySelector('.region span')
const country_subreg = document.querySelector('.sub span')
const country_cap = document.querySelector('.cap span')
const country_domain = document.querySelector('.domain span')
const country_curr = document.querySelector('.curr span')
const country_lan = document.querySelector('.lan span')
const country_flag = document.querySelector('.flag')
const switcher = document.querySelector('.switcher')
const ion_icon = document.querySelector('.moon ion-icon')
const body = document.querySelector('body')
const btn_cont = document.querySelector('.border_btn')
const back_btn = document.querySelector('.back_btn')
const country_det = document.querySelector('.country_det')

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

async function getBorderCountry(border) {
    response = await fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)
    data = await response.json()
    return data
}

async function fetchCountry(name) {
    response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    data = await response.json()
    const status = response.ok
    return { data, status }
}

function btnMaker(country) {
    const html = `<button>${country}</button>`
    return html
}

function backHome(e) {
    window.location.replace('/index.html')
}

function redirectBorder(e) {
    if (e.target.tagName === 'BUTTON') {
        console.log(e.target.textContent)
        window.location.replace(`/detail.html?country=${e.target.textContent}`)
    }
}

// get particular country
const urlParam = new URLSearchParams(window.location.search);
const myParam = urlParam.get('country')

const country_found = fetchCountry(myParam)

country_found.then(data => {

    if (data.status) {
        const datas = data.data[0]

        country_flag.setAttribute('src', datas.flag);
        country_name.textContent = datas.name;
        country_native.textContent = datas.nativeName;
        country_pop.textContent = datas.population;
        country_region.textContent = datas.region;
        country_subreg.textContent = datas.subregion;
        country_cap.textContent = datas.capital;
        country_domain.textContent = datas.topLevelDomain[0];
        datas.currencies.forEach(curr => {
            if (country_curr.textContent) {
                country_curr.textContent += `, ${curr.name}`
            } else {
                country_curr.textContent = `${curr.name}`
            }
        })
        datas.languages.forEach(lan => {
            if (country_lan.textContent) {
                country_lan.textContent += `, ${lan.name}`
            } else {
                country_lan.textContent = `${lan.name}`
            }
        })

        if (datas.borders.length) {
            datas.borders.forEach(border => {
                getBorderCountry(border).then(data => {
                    const btn = btnMaker(data.name)
                    btn_cont.innerHTML += btn
                })
            })
        } else {
            btn_cont.innerHTML = '<h3>This county has no neigbouring countries</h3>'
            console.log('no')
        }

    } else {
        country_det.innerHTML = '<h1>No country data for country with this name</h1>'
        country_det.style.width = '100%'
        country_det.style.justifyContent = 'center'
        country_det.style.textAlign = 'center'

    }

})

// event listeners
switcher.addEventListener('click', changeMood)
back_btn.addEventListener('click', backHome)
btn_cont.addEventListener('click', redirectBorder)
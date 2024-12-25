const h1 = document.querySelector('h1')
const body = document.querySelector('body')
const darkModeButton = document.querySelector('.dark-mode')
const modeText = document.querySelector('.mode-text')
const themeIcon = document.querySelector('.theme')

const countryFlag = document.querySelector('.country-flag')
const backArrow = document.querySelector('.back-arrow')
const navTitle = document.querySelector('.nav-title')

const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')

const borderCountries = document.querySelector('.borders')
const mulipleBorders = document.querySelector('.multiple-borders')

// This gives us the name value from query string : new URLSearchParams(window.location.search).get('name')
const countryName = new URLSearchParams(window.location.search).get('name')
// console.log('Welcome to ', countryName)

let darkMode = JSON.parse(localStorage.getItem('darkMode'))

// Dark Mode Logic Below:
if (darkMode.isDark) {
    body.classList.add('color-mode-change');
    modeText.innerText = 'Light Mode'
    themeIcon.src = 'sun-outline.svg'
} else {
    body.classList.remove('color-mode-change');
    modeText.innerText = 'Dark Mode'
    themeIcon.src = 'moon-outline.svg'
}

// Event listener for toggling the theme
darkModeButton.addEventListener('click', () => {
    darkMode.isDark = !darkMode.isDark;

    if (darkMode.isDark) {
        body.classList.add('color-mode-change');
        modeText.innerText = 'Light Mode'
        themeIcon.src = 'sun-outline.svg'
    } else {
        body.classList.remove('color-mode-change');
        modeText.innerText = 'Dark Mode'
        themeIcon.src = 'moon-outline.svg'
    }

    // Save the updated state to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
});

backArrow.addEventListener('click', () => {
        history.back()
})

// This is the API from where we need country specific info on click= https://restcountries.com/v3.1/name/{name}?fullText=true
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        // Here since we are using data[0] i.e first value of array we can use destructuring and name that first value as 'country' for our ease. syntax would be [country]
        // console.log([country])

        countryFlag.src = country.flags.svg
        h1.innerText = country.name.common

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common
        }

        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        subRegion.innerText = country.subregion
        capital.innerText = country.capital.join(', ')

        if (country.tld) {
            domain.innerText = Object.values(country.tld).join(', ').toString()
        }


        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        }
        else {
            currencies.innerText = ''
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if(country.borders){
            country.borders.map((region)=> {

                const anchor = document.createElement('a')

                fetch(`https://restcountries.com/v3.1/alpha/${region}`)
                    .then((res)=> res.json())
                    .then(([borderCountry])=>  { 
                        anchor.innerText = borderCountry.name.common
                        anchor.classList.add('borders')
                        anchor.href = `/country.html?name=${borderCountry.name.common}`
                        mulipleBorders.append(anchor)
                    })
                
                    


            })
        }

            // country.borders.map((region)=> {console.log(region)})



    })

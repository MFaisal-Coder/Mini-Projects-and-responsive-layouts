const darkModeButton = document.querySelector('.dark-mode')
const modeText = document.querySelector('.mode-text')
const themeIcon = document.querySelector('.theme')
const body = document.querySelector('body')
const countriesContainer = document.querySelector('.countries-container')
const select = document.querySelector('.region-select')
const inputField = document.querySelector('.input-field')
const navTitle = document.querySelector('.nav-title')

const darkMode = JSON.parse(localStorage.getItem('darkMode')) || {
    isDark: false
}

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

// Here we are using a variable to stroe all country data for using it later
let allCountriesData

// Adding Cards Logic below:
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        countryCards(data)
        // Here we are storing all countries data in a variable to use it later
        allCountriesData = data
    })

// Option selection event below:
select.addEventListener('change', (evt) => {
    // console.log(evt.target.value)
    const region = evt.target.value
    // console.log(region)

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => res.json())
        .then((data) => countryCards(data))
    })

// Input event below:
inputField.addEventListener('input',(e)=>{
   /*  const countryName = e.target.value.toLowerCase()
    console.log(countryName)

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((res) => res.json())
        .then((data) => countryCards(data)) */

    const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

    // console.log(filteredCountries)
    countryCards(filteredCountries)

})



// Used a function block to make the code reusable since  it was being used again and again
function countryCards(data){
    // We are setting the innerHTML as blank here since our page would already have the country cards loaded as soon as the data gets fetched from the API. ALso when we try to create new cards using our code below, they would get added but at the end. Hence, we are setting it to blank as soon as this function is called and later it would get created.
    countriesContainer.innerHTML = ''

    data.forEach((country) => {
        //   console.log(country)
        // This code below creates new cards and adds them to our container
        const card = document.createElement('a')
        card.classList.add('country-card')
        // We are passing query string here -> ?name=
        card.href = `/country.html?name=${country.name.common}`

        const countryCard = `
            <img class="flag" src="${country.flags.svg}" alt="${country.name.common}">
            <div class="country-info">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
            `

        // console.log(card)
        card.innerHTML = countryCard
        countriesContainer.append(card)
    })
}
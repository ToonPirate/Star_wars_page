const peopleUrl = 'https://swapi.dev/api/people/?search='
const planetUrl = 'https://swapi.dev/api/planets/?search='
const button = document.querySelector('#get-fact')

button.addEventListener('click', search)

//Search function
function search(){
    let searchInput = document.querySelector('#search-field').value
    let planet = planetUrl + searchInput
    let person = peopleUrl + searchInput
    showResult(getPlanet(planet), "planet")
    showResult(getPerson(person), "person")
}

// Fetches Planets
async function getPlanet(searchInput) {
    const result = await fetch(searchInput)
    const data = await result.json()
    return data
}

// Fetches People
async function getPerson(searchInput) {
    const result = await fetch(searchInput)
    const data = await result.json()
    showResult(data.results, "people")
}

// Prints data in an unordered list with divs
function showResult(data, infoType){
    for(let i = 0; i < data.length; i++){
        let div = document.createElement('div')
        div.setAttribute("id","swFact")
        let ul = document.createElement('ul')
        if (infoType === "planet"){
            planetTraits(ul, data[i])
        }
        else if (infoType === "people"){
            peopleTraits(ul, data[i])
        }
        div.appendChild(ul)
        let currentDiv = document.getElementById("swFact");
        document.body.insertBefore(div, currentDiv)
    }
}

// Structures People data
async function peopleTraits(ul, data) {
    let swFacts = {'Name' : data.name, 'D.O.B': data.birth_year, 'Eye color': data.eye_color,
                    'Gender':data.gender, 'Hair color':data.hair_color, 'Height (cm)':data.height,
                    'Mass (kg)':data.mass, 'Skin color':data.skin_color}

    for (let i in swFacts){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(i + ': ' + swFacts[i]))
        ul.appendChild(li)
    }
    let planet = await getPlanet(data.homeworld)

    planetTraits(ul, planet)

}

// Structures Planet data
function planetTraits(ul, data) {
    let swFacts = {'Planet name' : data.name, 'Diameter': data.diameter, 'Rotation period (hrs)': data.rotation_period,
                    'Orbital period (days)':data.orbital_period, 'Gravity':data.gravity, 'Population':data.population,
                    'Climate':data.climate, 'Terrain':data.terrain, 'Surface water (%)':data.surface_water}

    for (let i in swFacts){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(i + ': ' + swFacts[i]))
        ul.appendChild(li)
    }
}


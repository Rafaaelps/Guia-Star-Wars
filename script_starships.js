let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};


async function loadCharacters(url) {
    const mainContent = document.getElementById ('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      responseJson.results.forEach(async (starships) => {
        const card = document.createElement("div")

        const shipsImage = {
            "CR90 corvette": "https://th.bing.com/th/id/R.3ed5585ba52246638db26497594a0e7b?rik=ib6VYR9pq1srtw&riu=http%3a%2f%2fimages1.wikia.nocookie.net%2f__cb20100522022503%2fstarwars%2fimages%2fe%2fe3%2fSundered-Heart.jpg&ehk=Uo5zRuYPsT5m14oLgnae3iGBM%2fDmSBKyyVdScoxmNm8%3d&risl=&pid=ImgRaw&r=0",
            "Star Destroyer": "https://th.bing.com/th/id/R.0ece0ea07c6ec6e127fa6c88053cc5fa?rik=qPryJ41R1S06yQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fIVUwJVf.jpg&ehk=dVE1KbL28lqQfBgWcyksM4mqxta1ToR390iyWD05qnQ%3d&risl=&pid=ImgRaw&r=0",
            "Rebel transport": "https://i.ytimg.com/vi/A2PXDE3exfU/maxresdefault.jpg",
            "Droid control ship": "https://th.bing.com/th/id/OIP.xpGpeDTiJCa2EZMe6-we_wHaET?rs=1&pid=ImgDetMain",
            "H-type Nubian yacht": "https://th.bing.com/th/id/OIP.AEAxJXq1ADt-XwkdbbozVAHaD6?rs=1&pid=ImgDetMain",
            "Republic Assault ship": "https://pm1.narvii.com/6870/9ed20da87e86042512e351f385723402e8ca6ddcr1-400-300v2_hq.jpg",
            "Solar Sailer": "https://th.bing.com/th/id/OIP.euas7P4cHUaklNVxQVrb1gHaGL?rs=1&pid=ImgDetMain",
            "Trade Federation cruiser": "https://i.pinimg.com/originals/ab/d3/28/abd328a8886df916823e6ee178b2b9f4.jpg",
            "Theta-class T-2c shuttle": "https://c1.staticflickr.com/5/4006/4263461243_9bf1d333dd.jpg",
            "Republic attack cruiser": "https://th.bing.com/th/id/OIP.k_nFtAxuBUrAUDrc9Zm_dQHaDt?rs=1&pid=ImgDetMain",
            "Naboo star skiff": "https://vignette.wikia.nocookie.net/starwars/images/d/df/Naboo_star_skiff_1.png/revision/latest?cb=20130212042348",
            "Jedi Interceptor": "https://th.bing.com/th/id/OIP.lyCEI4tzw3JCavAHapGPDQHaEK?rs=1&pid=ImgDetMain",
            "arc-170": "https://th.bing.com/th/id/R.a565e7ac43314d06aedac30e95619920?rik=8P%2fvv3S54WcnRQ&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20111112062600%2fstarwars%2fimages%2fb%2fba%2fARC170starfighter.jpg&ehk=0Ziyb1i4TPxUVohxPFhNJrjHNn2v7pjoc73HX5GBi3I%3d&risl=&pid=ImgRaw&r=0",
            "Banking clan frigte": "https://th.bing.com/th/id/R.64bb8d143c1bf2f20156f9486be9d51b?rik=pAYm2kWO4SXKeA&pid=ImgRaw&r=0",
            "Belbullab-22 starfighter": "https://media.sketchfab.com/models/2785243f8c8944c788cb0cbab3100cb4/thumbnails/1b7afdc2478243e3b5a36f6089398ddb/43dacc7a910c40d79996738cb03cf299.jpeg",
            "V-wing": "https://th.bing.com/th/id/OIP.NpyfTtttoDWZAsIML9tI5gHaD5?rs=1&pid=ImgDetMain"
        };

        let urlImg = shipsImage[starships.name] || `https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg`;
        
        card.style.backgroundImage = `url('${urlImg}')`
        card.className = "cards"

        const characterNameBG = document.createElement("div")
        characterNameBG.className = "character-name-bg"

        const characterName = document.createElement("span")
        characterName.className = "character-name"
        characterName.innerText = `${starships.name}`

        characterNameBG.appendChild(characterName)
        card.appendChild(characterNameBG)

        card.onclick = () => {
            const modal = document.getElementById('modal')
            modal.style.visibility = "visible"

            const modalContent = document.getElementById("modal-content")
            modalContent.innerHTML = ''

            const characterImage = document.createElement("div")

            characterImage.style.backgroundImage = `url('${urlImg}')`
            characterImage.className = "character-image"

            const name = document.createElement("span")
            name.className = "character-details"
            name.innerText = `Nome: ${starships.name}`
           
            const starshipModel = document.createElement("span")
            starshipModel.className = "character-details"
            starshipModel.innerText = `Modelo: ${starships.model}`

            const manufacturer = document.createElement("span")
            manufacturer.className = "character-details"
            manufacturer.innerText = `Fabricante: ${starships.manufacturer}`

            const cargoCapacity = document.createElement("span")
            cargoCapacity.className = "character-details"
            cargoCapacity.innerText = `Capacidade de Carga: ${convertCargoCapacity(starships.cargo_capacity)}`

            const starshipLength = document.createElement("span")
            starshipLength.className = "character-details"
            starshipLength.innerText = `Comprimento: ${convertStarshipLength(starships.length)}`

            modalContent.appendChild(characterImage)
            modalContent.appendChild(name)
            modalContent.appendChild(starshipModel)
            modalContent.appendChild(manufacturer)
            modalContent.appendChild(cargoCapacity)
            modalContent.appendChild(starshipLength)
            
        }

        mainContent.appendChild(card)
      });

      const nextButton = document.getElementById('next-button')
      const backButton = document.getElementById('back-button')

      nextButton.disabled = !responseJson.next
      backButton.disabled = !responseJson.previous

      backButton.style.visibility = responseJson.previous? "visible" : "hidden"

      currentPageUrl = url
         
    } catch (error) {
      alert('Erro ao carregar as Naves Estrelares')
      console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()
    
    await loadCharacters(responseJson.next)

    }catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()
    
    await loadCharacters(responseJson.previous)

    }catch (error){
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertCargoCapacity(cargoCapacity){
    if(cargoCapacity === "unknown") {
        return "Desconhecido"
    }
   
    return `${cargoCapacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} t`
    
}

function convertStarshipLength(starshipLength) {
   
    return `${starshipLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} m`
}